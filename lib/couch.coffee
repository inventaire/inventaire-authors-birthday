module.exports = couch_ = {}

couch_.mapResult = (res, type)-> res.rows.map (row)-> row[type]
couch_.mapDoc = (res)-> couch_.mapResult res, 'doc'