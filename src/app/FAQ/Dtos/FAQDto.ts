import { FAQIntreface } from "../Interfaces/FAQIntreface";

export class FAQDto implements FAQIntreface{
  id: number=0;
  question: string="";
  answer: string="";
  displayOrder: number=0;
  visiable:boolean;
  categoryId:number=0;
}
