/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-05-19 11:38:30
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-07-10 15:54:03
 * @Description: 
 */
import {TypeOrmVisitor as Visitor} from './visitor';
import {Token} from '@steedos/odata-v4-parser/lib/lexer';
import {query} from '@steedos/odata-v4-parser';
import {SQLLang} from '@steedos/odata-v4-sql';
import {SqlOptions} from './sqlOptions';

/**
 * Creates an SQL query descriptor from an OData query string
 * @param {string} odataQuery - An OData query string
 * @return {string}  SQL query descriptor
 * @example
 * const filter = createQuery("$filter=Size eq 4 and Age gt 18");
 * let sqlQuery = `SELECT * FROM table WHERE ${filter.where}`;
 */
export function createQuery(odataQuery: string, options?: SqlOptions): Visitor;
export function createQuery(odataQuery: Token, options?: SqlOptions): Visitor;
export function createQuery(odataQuery: string | Token, options = <SqlOptions>{}): Visitor {
  if (!options.type) {
    options.type = SQLLang.Oracle;
  }
  let ast: Token = <Token>(typeof odataQuery == 'string' ? query(<string>odataQuery) : odataQuery);
  return new Visitor(options).Visit(ast).asType();
}