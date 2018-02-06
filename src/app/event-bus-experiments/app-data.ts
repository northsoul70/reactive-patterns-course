import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";
import {Observable, BehaviorSubject} from 'rxjs'

class DataStore {

  private lessonsListSubject = new BehaviorSubject([]);

  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  initializeLessonsList(newList: Lesson[]) {
    this.lessonsListSubject.next(_.cloneDeep(newList))
  }

  addLesson(newLesson: Lesson) {
    const lessons = this.cloneLessons();
    lessons.push(_.cloneDeep(newLesson));
    this.lessonsListSubject.next(lessons);
  }

  deleteLesson(deleted: Lesson) {
    const lessons = this.cloneLessons();
    _.remove(lessons,
      lesson => lesson.id === deleted.id);
    this.lessonsListSubject.next(lessons);
  }

  toggleLessonViewed(toggled: Lesson) {
    const lessons = this.cloneLessons();
    const lesson: Lesson = _.find(lessons, lesson => lesson.id === toggled.id);

    lesson.completed = !lesson.completed;
    this.lessonsListSubject.next(lessons);
  }

  private cloneLessons(): Lesson[] {
    return _.cloneDeep(this.lessonsListSubject.getValue());
  }
}

export const store = new DataStore();







