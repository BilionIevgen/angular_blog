import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Post } from "src/app/shared/interface";
import { PostService } from "src/app/shared/post.service";
import { AlertService } from "../../shared/services/alert.service";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  post: Post;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private alert: AlertService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getPostById(params["id"]);
        })
      )
      .subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
          author: new FormControl(post.author, Validators.required),
        });
      });
  }
  submit() {
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return
    }
    this.postService.update({
      id: this.post.id,
      title: this.form.get("title").value,
      text: this.form.get("text").value,
      author: this.form.get("author").value,
      date: new Date(),
    }).subscribe(()=>{
      this.alert.success('Post was editted')
      this.form.reset();
      this.router.navigate(['/admin','dashboard'])
    });

  }
}
