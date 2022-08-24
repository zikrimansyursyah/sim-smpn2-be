const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  is_remember: Joi.boolean().required(),
});

const userSchema = Joi.object({
  no_ktp: Joi.string().min(15).required(),
  nuptk: Joi.string().allow(null, ""),
  nisn: Joi.string().allow(null, ""),
  no_induk_sekolah: Joi.string().min(5).required(),
  tingkat_kelas: Joi.number().allow(null, ""),
  id_kelas: Joi.number().allow(null, ""),
  nama_lengkap: Joi.string().min(3).required(),
  nama_panggilan: Joi.string().allow(null, ""),
  tempat_lahir: Joi.string().min(3).required(),
  tanggal_lahir: Joi.string().min(5).required(),
  username: Joi.string().min(3).required(),
  password: Joi.optional(),
  no_telp: Joi.string().min(8).required(),
  email: Joi.string().allow(null, ""),
  alamat: Joi.string().min(8).required(),
  kelurahan: Joi.number().required(),
  kecamatan: Joi.number().required(),
  kabupaten: Joi.number().required(),
  provinsi: Joi.number().required(),
  id_mata_pelajaran: Joi.number().allow(null, ""),
  jenis_kelamin: Joi.string().required(),
  status_pernikahan: Joi.string().allow(null, ""),
  pendidikan_terakhir: Joi.string().allow(null, ""),
  asal_sekolah: Joi.string().allow(null, ""),
  tahun_lulus_sekolah: Joi.number().allow(null, ""),
  gelar: Joi.string().allow(null, ""),
  jabatan: Joi.string().allow(null, ""),
  jabatan_tambahan: Joi.string().allow(null, ""),
  nama_ayah: Joi.string().allow(null, ""),
  nama_ibu: Joi.string().allow(null, ""),
});

const findAllTeachersSchema = Joi.object({
  first: Joi.number().required(),
  rows: Joi.number().required(),
  filter: Joi.string().allow(null, ""),
});

const findAllStundentsSchema = Joi.object({
  first: Joi.number().required(),
  rows: Joi.number().required(),
  filter: Joi.string().allow(null, ""),
  id_kelas: Joi.number().allow(null).optional(),
});

const deleteUserSchema = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  loginSchema,
  userSchema,
  findAllTeachersSchema,
  deleteUserSchema,
  findAllStundentsSchema,
};
