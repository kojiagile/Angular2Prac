export class Post {
  id: number;
  title: string;
  content: string;
  date: string;

  constructor(id: number, title: string, content: string, date: string) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.date = date;
  }

}