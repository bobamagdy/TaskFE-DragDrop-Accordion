import Swal from 'sweetalert2'
import { FAQService } from './../../../FAQ/Services/FAQ.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUpdateFAQComponent } from 'src/app/FAQ/Components/Create-Update-FAQ/Create-Update-FAQ.component';
import { FAQDto } from 'src/app/FAQ/Dtos/FAQDto';
import { CategoryDto } from '../../Dtos/CategoryDto';
import { CategoryService } from '../../Services/Category.service';
import { CreateUpdateCategoryComponent } from '../Create-Update-Category/Create-Update-Category.component';
import { NgDragDropModule } from 'ng-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-View-Category',
  templateUrl: './View-Category.component.html',
  styleUrls: ['./View-Category.component.css'],
  providers:[CategoryService]
})
export class ViewCategoryComponent implements OnInit {
  visable=false;
  categoriesList: CategoryDto[]=[];
categoryNew=new CategoryDto();
faqNew=new FAQDto();
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};
  constructor(private CategoryServ:CategoryService,private faqService:FAQService, private _modalService: BsModalService,) { }

  ngOnInit() {
    this.GetAllCategories();
  }

  GetAllCategories(){
    this.CategoryServ.ReadAllWithFAQs().subscribe(
      (res)=>{this.categoriesList=res.data.categories},
      (err)=>{console.log(err)}
    )
  }
  OpenPoupeCreateUpdate(row: CategoryDto) {
    let createOrEditRadDialog: BsModalRef;
    createOrEditRadDialog = this._modalService.show(
      CreateUpdateCategoryComponent,
      { animated: true, initialState: row, }
    );

    createOrEditRadDialog.content.closeModal.subscribe(() => {
      this._modalService._hideModal(1);
      this.GetAllCategories();
    });
  }

  OpenPoupeCreateUpdateFaq(row: FAQDto,catId:number,index:number) {
    let createOrEditRadDialog: BsModalRef;
    createOrEditRadDialog = this._modalService.show(
      CreateUpdateFAQComponent,
      { animated: true, initialState: {row,catId} }
    );

    createOrEditRadDialog.content.closeModal.subscribe(() => {
      this._modalService._hideModal(1);
      // this.GetAllCategories();
    //  var cat=this.categoriesList.find(s=>s.id==catId);
    //  if(cat!=undefined){
    //   cat.visiable=true;
     this.GetAllCategories();

      // this.faqService.GetById(row.id).subscribe(
      //   (res)=>{row=res.data},
      //   (err)=>{}
      // )
    //  }
    });
  }

  deleteFaq(id:number,category:CategoryDto){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You want to delete this FAQ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.faqService.Delete(id).subscribe(
          (res)=>{
            // this.GetAllCategories(),
            this.faqService.GetFaqByCategoryId(category.id).subscribe(
              (res)=>{category.faqs=res.data},
              (err)=>{console.log(err)}
            )
            category.visiable=true;
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'FAQ has been deleted.',
            'success'
          )
          },
          (err)=>{console.log(err)}
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'FAQ is safe :)',
          'error'
        )
      }
    })

  }
  deleteCat(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You want to delete this category!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.CategoryServ.Delete(id).subscribe(
          (res)=>{this.GetAllCategories(),swalWithBootstrapButtons.fire(
            'Deleted!',
            'Category has been deleted.',
            'success'
          )
          },
          (err)=>{console.log(err)}
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Category is safe :)',
          'error'
        )
      }
    })



    // this.CategoryServ.Delete(id).subscribe(
    //   (res)=>{this.GetAllCategories(),Swal.fire(res.message)
    //   },
    //   (err)=>{console.log(err)}
    // )
  }
  save(){

  }
  cancel(){

  }

  drop(event: CdkDragDrop<CategoryDto[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
    dropFaq(event: CdkDragDrop<FAQDto[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
}
