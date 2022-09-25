const db = require("../models/index.js");
const Nilai = db.nilai;
const Mapel = db.mapel;
const { Op, QueryTypes, literal } = require("sequelize");
const { sequelize } = require("../models/index.js");

exports.findUserKHS = async (id_kelas, id_siswa, semester, kelas) => {
    const nilai = await Nilai.findAll({
        where: {id_kelas, id_siswa, semester},
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = nilai.id_kelas
                    )`),
                    "nama_kelas",
                ],
                [
                    sequelize.literal(`(
                        SELECT mapel.nama
                        FROM mapel as mapel
                        WHERE mapel.id = nilai.id_mapel
                    )`),
                    "nama_mapel",
                ],
            ],
        },
        raw: true,
    });

    const mapel = await Mapel.findAll({
        where: { kelas },
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = ${id_kelas}
                    )`),
                    "nama_kelas"
                ],
            ]
        },
        raw: true,
    })

    return {nilai, mapel};
};