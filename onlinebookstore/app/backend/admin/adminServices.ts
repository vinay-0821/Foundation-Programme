import { db } from '../database.ts';

export const fetchAllBooks = async (
  genre?: string,
  seller?: string,
  title?: string,
  sortBy: string = 'created_at',
  order: string = 'desc'
) => {
  let baseQuery = `
    SELECT b.bookid, b.title, b.price, b.date_publish, u.email AS seller_email, b.stock AS avaliableCount,
           GROUP_CONCAT(g.name) AS genre
    FROM books b
    JOIN Users u ON b.userid = u.userid
    LEFT JOIN bookgenre bg ON b.bookid = bg.bookgenreid
    LEFT JOIN genre g ON bg.bookgenreid = g.genreid
    WHERE 1 = 1
  `;

  const params: any[] = [];

  if (genre) {
    baseQuery += ` AND g.name = ?`;
    params.push(genre);
  }

  if (seller) {
    baseQuery += ` AND u.email = ?`;
    params.push(seller);
  }

  if (title) {
    baseQuery += ` AND b.title LIKE ?`;
    params.push(`%${title}%`);
  }

  baseQuery += ` GROUP BY b.bookid, b.title, b.price, b.date_publish, u.email`;

  if (sortBy === 'price' || sortBy === 'date_publish') {
    const orderClause = order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    baseQuery += ` ORDER BY b.${sortBy} ${orderClause}`;
  }

  const [rows] = await (await db).query(baseQuery, params);
  return rows;
};
