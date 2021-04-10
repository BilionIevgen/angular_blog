import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/shared/interface";
import { PostService } from "src/app/shared/post.service";
import { AlertService } from "../../shared/services/alert.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  search: string = "";
  pSubscr: Subscription;
  dSubscr: Subscription;
  constructor(private postServise: PostService, private alert: AlertService) {}

  ngOnInit() {
    this.pSubscr = this.postServise.getAll().subscribe((data) => {
      this.posts = data;
    });
  }

  remove(id) {
    this.dSubscr = this.postServise.remove(id).subscribe(
      (data) => {
        this.alert.success('Post was deleted')
        this.posts = this.posts.filter((post) => post.id !== id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    if (this.pSubscr) {
      this.pSubscr.unsubscribe();
    }
    if (this.dSubscr) {
      this.dSubscr.unsubscribe();
    }
  }
}
