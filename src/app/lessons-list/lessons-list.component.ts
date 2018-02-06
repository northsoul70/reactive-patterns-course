import {Component, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {Observer} from "rxjs";
import {store} from "../event-bus-experiments/app-data";

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {

  public lessons: Lesson[] = [];

  constructor() {
  }

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  next = (data: Lesson[]) => {
    this.lessons = data;
  }

  error(err: any) {
    console.log(err)
  };

  complete() {
    console.log("Completed");
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }
}



