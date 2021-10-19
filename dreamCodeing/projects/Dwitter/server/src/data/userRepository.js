import { ObjectId } from 'mongodb';
import database from '../db/database.js';
const { getDb } = database;

/**
 * get users collection
 * @returns {Collection} users collection
 */
export function getUsers() {
  return getDb().collection('users');
}

/**
 * Select user by username
 * @param {string} user.username
 * @returns
 * - user : {_id, id, username, name, password, email, url}
 * - null : 자원없음
 */
export const findByUsername = async username => {
  const user = await getUsers().findOne({ username });
  return user //
    ? { ...user, id: user._id.toHexString() }
    : null;
  // _id: ObjectId(_id)
  // id: ObjectId(_id).toString()
};

/**
 * Create user
 * @param {object} user { username, password, name, email, url }
 * @return Promise<InsertOneResult<TSchema>>;
 * - InsertOneResult.acknowledged: 생성 성공 여부
 * - InsertOneResult.insertedId: 생성된 document _id
 */
export const createUser = async user => {
  return getUsers().insertOne(user);
};

/**
 * Select user by id
 * @param {string} user.id
 * @returns
 * - user : {_id, id, username, name, email, url}
 * - null : 자원없음
 */
export const findById = async id => {
  const user = await getUsers().findOne({ _id: ObjectId(id) }, { password: 0 }); // { password: 0 } 제외할 필드
  return user //
    ? { ...user, id: user._id.toHexString() }
    : null;
};
