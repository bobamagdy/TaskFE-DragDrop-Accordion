import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CategoryService } from '../../Services/Category.service';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { CreateUpdateCategoryDto } from '../../Dtos/CreateUpdateCategoryDto';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-Create-Update-Category',
  templateUrl: './Create-Update-Category.component.html',
  styleUrls: ['./Create-Update-Category.component.css'],
})
export class CreateUpdateCategoryComponent implements OnInit {
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  };
  saveDisable = false;
  isModalOpen = false;
  form: FormGroup;
  submitted = false;
  @Output() closeModal = new EventEmitter<any>();
  Item: CreateUpdateCategoryDto = this.options.initialState as CreateUpdateCategoryDto;
  constructor(
    private fb: FormBuilder,
    private categoryServ: CategoryService,
    private options: ModalOptions
  ) {
    this.buildForm(new CreateUpdateCategoryDto());
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),

    });
  }

  ngOnInit(): void {
    if (
      this.Item == new CreateUpdateCategoryDto() ||
      this.Item != null ||
      this.Item != undefined
    ) {
      this.buildForm(this.Item);
    }
  }

  buildForm(category: CreateUpdateCategoryDto) {
    this.submitted = false;
    this.form = this.fb.group({
      id: [category?.id],
      name: [category?.name, Validators.required],
    });
  }

  save() {
    this.submitted = true;
    var dto=this.form.value;
    if (this.form.invalid) {
      return;
    }
    if (dto.id !== 0) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.categoryServ.Create(this.form.value).subscribe(
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
    this.categoryServ.Update(dto, dto.id).subscribe(
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


  close() {
    this.closeModal.emit(false);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
