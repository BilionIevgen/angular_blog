import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interface';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required]),
    author: new FormControl(null, [Validators.required]),
  });
  public isFetching: boolean = false
  constructor(
    private router: Router,
    public auth: AuthService,
    private postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  submit(){
    this.isFetching = true
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return
    }
    const post: Post ={
      title : this.form.get('title').value,
      text : this.form.get('text').value,
      author : this.form.get('author').value,
      date : new Date(),
    } 
    this.postService.create(post).subscribe(()=>{ 
      this.alert.success('Post was created')
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
        this.isFetching = false
       },()=>{
        this.isFetching = false
       })
  }

}
