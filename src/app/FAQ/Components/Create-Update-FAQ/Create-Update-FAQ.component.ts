import { CategoryService } from './../../../Category/Services/Category.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { FAQDto } from '../../Dtos/FAQDto';
import { FAQService } from '../../Services/FAQ.service';
import { createUpdateFaqDto } from '../../Dtos/CreateUpdateFaqDto';
import Swal from 'sweetalert2'
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-Create-Update-FAQ',
  templateUrl: './Create-Update-FAQ.component.html',
  styleUrls: ['./Create-Update-FAQ.component.css']
})
export class CreateUpdateFAQComponent implements OnInit {
  //#region declare properities
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  };
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
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
     toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  answer:string="";
  categoryId:number=0;
  saveDisable = false;
  isModalOpen = false;
  form: FormGroup;
  submitted = false;
  @Output() closeModal = new EventEmitter<any>();
  Item: any = this.options.initialState;
  categoryList: any=[];
  //#endregion
  constructor(
    private fb: FormBuilder,
    private faqServ: FAQService,
    private catServ: CategoryService,
    private options: ModalOptions
  ) {
    this.buildForm(new createUpdateFaqDto());
    this.form = new FormGroup({
      id: new FormControl(0),
      categoryId: new FormControl(0),
      question: new FormControl(''),
      answer: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (
      this.Item == new createUpdateFaqDto() ||
      this.Item != null ||
      this.Item != undefined
    ) {
      this.buildForm(this.Item.row);
    }
    this.catServ.ReadAll().subscribe((res)=>{this.categoryList=res.data},(err)=>{})
  }
  buildForm(faq: createUpdateFaqDto) {
    this.submitted = false;
    this.categoryId=this.Item.catId;
    this.form = this.fb.group({
      id: [faq?.id],
      question: [faq?.question, Validators.required],
      answer: [faq?.answer, Validators.required],
    });
  }
//#region Save=>create,update
  save() {
    this.submitted = true;
    var dto=this.form.value;
    if (this.form.invalid) {
      return;
    }
    if (dto.id !== 0) {
      this.categoryId=this.Item.catId;
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.faqServ.Create(this.form.value,this.categoryId).subscribe(
      (response) => {
        Swal.fire(response.message)

        this.saveDisable = false;
        this.closebutton.nativeElement.click();
        this.closeModal.emit();
        this.isModalOpen = false;
        this.form.reset();
      },
      (err) => {
        this.saveDisable = false;
        this.closebutton.nativeElement.click();
      }
    );
  }

  update() {
    var dto=this.form.value;
    dto.categoryId=this.categoryId;

    this.faqServ.Update(this.form.value, dto.id).subscribe(
      (response) => {
        Swal.fire(response.message)
        this.saveDisable = false;
        this.isModalOpen = false;
        this.form.reset();
        this.closebutton.nativeElement.click();
        this.closeModal.emit();
      },
      (err) => {
        this.saveDisable = false;
        this.closebutton.nativeElement.click();
      }
    );
  }
//#endregion Save=>create,update

  close() {
    this.closeModal.emit(false);
  }

//function for validation form
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
