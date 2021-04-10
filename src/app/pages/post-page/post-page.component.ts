import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Post } from "src/app/shared/interface";
import { PostService } from "src/app/shared/post.service";

@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.scss"],
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: Post;
  pSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.pSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getPostById(params["id"]);
        })
      )
      .subscribe((post) => {
        this.post = post;
      });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}
