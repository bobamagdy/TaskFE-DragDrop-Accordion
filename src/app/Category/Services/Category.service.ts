import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from '../Dtos/CategoryDto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constants: string;

  constructor(private http: HttpClient) {
    this.constants = environment.apis.default.url;
  }
  //http://mocawebsitebackend.techno-politan.xyz/api/v1.0/Categories
Create(input: CategoryDto): Observable<any> {
  return this.http.post<CategoryDto>(
    this.constants + `/v1.0/Categories`,
    JSON.stringify(input),
    {
      headers: { 'content-type': 'application/json' },
    }
  );
}

Update(input: CategoryDto, categoryId: number): Observable<any> {
  return this.http.put<CategoryDto>(
    this.constants + `/v1.0/Categories/${categoryId}`,
    JSON.stringify(input),
    {
      headers: { 'content-type': 'application/json' },
    }
  );
}

ReadAll():Observable<any>{
  return this.http.get<any>(
    this.constants + `/v1.0/Categories`
  );
}

ReadAllWithFAQs():Observable<any>{
  return this.http.get<any>(
    this.constants + `/v1/Categories?WithFaqs=true&WithNonCategorizedFaqs=true`
  );
}

GetById(categoryId:number) :Observable<CategoryDto>{
  return this.http.get<CategoryDto>(
    this.constants + `/v1.0/Categories/${categoryId}`
  );
}

Delete(id:number) {
  return this.http.delete<any>(this.constants+ `/v1.0/Categories/${id}`);
}

}
