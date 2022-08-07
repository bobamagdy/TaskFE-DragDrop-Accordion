import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FAQDto } from '../Dtos/FAQDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  constants: string;

  constructor(private http: HttpClient) {
    this.constants = 'https:/mocawebsitebackend.techno-politan.xyz/api';
  }
  Create(input: FAQDto, categoryId: number): Observable<any> {
    return this.http.post<FAQDto>(
      this.constants + `/v1.0/Faqs/Category/${categoryId}`,
      JSON.stringify(input),
      {
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  Update(input: FAQDto, faqId: number): Observable<any> {
    return this.http.put<FAQDto>(
      this.constants + `/v1.0/Faqs/${faqId}`,
      JSON.stringify(input),
      {
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  ReadAll(WithFaqs:boolean,WithNonCategorizedFaqs:boolean):Observable<FAQDto[]>{
    return this.http.get<FAQDto[]>(
      this.constants + `/v1.0/Categories?WithFaqs=${WithFaqs}&WithNonCategorizedFaqs=${WithNonCategorizedFaqs}`
    );
  }

  GetById(faqId:number) :Observable<any>{
    return this.http.get<FAQDto>(
      this.constants + `/v1.0/Faqs/${faqId}`
    );
  }

  Delete(id:number) {
    return this.http.delete<any>(this.constants+ `/v1.0/Faqs/${id}`);
  }

  GetFaqByCategoryId(categoryId:number) :Observable<any>{
    return this.http.get<FAQDto>(
      this.constants + `/v1.0/Faqs/Category/${categoryId}`
    );
  }
}
