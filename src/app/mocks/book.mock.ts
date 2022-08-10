import { Book } from "@shared/models/book.model";

export const mockBook: Book = {
  id: '1',
  count: 6, 
  price: 56.95,
  title: 'Apuntes de Javascript I - Nivel Intermedio',
  author: 'JuanMa Garrido', 
  level: 'Intermediate', 
  description: 'En Castellano) Revision de conceptos (actuales) de javascript desde basicos hasta un nivel intermedio',
  cover: 'https://jsbooks.revolunet.com/img/cover-apuntes-javascript-intermedio.png',
  tags: ['core']
}