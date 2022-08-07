import { FAQDto } from "src/app/FAQ/Dtos/FAQDto";
import { CategoryIntreface } from "../Interfaces/CategoryInterface";

export class CategoryDto implements CategoryIntreface{
  id: number=0;
  name: string="";
  displayOrder: number=0;
  faqs: FAQDto[]=[];
  visiable:boolean;
}
