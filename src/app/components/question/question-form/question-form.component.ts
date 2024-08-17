import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'src/app/shared/service/chapter.service';
import { CurriculumService } from 'src/app/shared/service/curriculum.service';
import { LessonService } from 'src/app/shared/service/lesson.service';
import { QuestionService } from 'src/app/shared/service/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  // public IMG_ROOT = "../uploads/";
  public IMG_ROOT = "https://click2pass.ca/uploads/";
  public hasQuestionMedia = false;
  public isMultipleChoice = true;
  public hasAnswerWithMedia = false;

  public categorySelectItems: any[] = [];
  public categorySelectItemsViewable: any[] = [];
  public curriculumSelectItems: any[] = [];
  public lessonSelectItems: any[] = [];
  public lessonSelectItemsViewable: any[] = [];

  public previewQuestionText = "";
  public previewMediaUrl = "";
  public previewAnswerOption1Text = "";
  public previewAnswerOption1MediaUrl = "";
  public previewAnswerOption2Text = "";
  public previewAnswerOption2MediaUrl = "";
  public previewAnswerOption3Text = "";
  public previewAnswerOption3MediaUrl = "";
  public previewAnswerOption4Text = "";
  public previewAnswerOption4MediaUrl = "";
  public previewAnswerOption5Text = "";
  public previewAnswerOption5MediaUrl = "";
  public previewAnswerOption6Text = "";
  public previewAnswerOption6MediaUrl = "";

  public questionForm = new FormGroup({
    questionText: new FormControl("", [Validators.required]),
    questionMediaUrl: new FormControl(null),
    questionMediaType: new FormControl("1"),
    numberOfOptionsVisible: new FormControl(4), // Not being used
    questionType: new FormControl(1),
    correctAnswerText: new FormControl(""),
    answerOption1Text: new FormControl(""),
    answerOption1MediaUrl: new FormControl(null),
    answerOption1MediaType: new FormControl("1"),
    isAnswer1Correct: new FormControl(false),
    answerOption2Text: new FormControl(null),
    answerOption2MediaUrl: new FormControl(null),
    answerOption2MediaType: new FormControl("1"),
    isAnswer2Correct: new FormControl(false),
    answerOption3Text: new FormControl(null),
    answerOption3MediaUrl: new FormControl(null),
    answerOption3MediaType: new FormControl("1"),
    isAnswer3Correct: new FormControl(false),
    answerOption4Text: new FormControl(null),
    answerOption4MediaUrl: new FormControl(null),
    answerOption4MediaType: new FormControl("1"),
    isAnswer4Correct: new FormControl(false),
    answerOption5Text: new FormControl(null),
    answerOption5MediaUrl: new FormControl(null),
    answerOption5MediaType: new FormControl("1"),
    isAnswer5Correct: new FormControl(false),
    answerOption6Text: new FormControl(null),
    answerOption6MediaUrl: new FormControl(null),
    answerOption6MediaType: new FormControl("1"),
    isAnswer6Correct: new FormControl(false),
    chapterId: new FormControl(
      window.localStorage.getItem("qf-selectedChapterId") &&
        window.localStorage.getItem("qf-selectedChapterId") != "null"
        ? window.localStorage.getItem("qf-selectedChapterId")
        : "0"
    ),
    lessonId: new FormControl(
      window.localStorage.getItem("qf-selectedLessonId") &&
        window.localStorage.getItem("qf-selectedLessonId") != "null"
        ? window.localStorage.getItem("qf-selectedLessonId")
        : "0"
    ),
    curriculumId: new FormControl(
      window.localStorage.getItem("qf-selectedCurriculumId") &&
        window.localStorage.getItem("qf-selectedCurriculumId") != "null"
        ? window.localStorage.getItem("qf-selectedCurriculumId")
        : "1"
    ),
  });

  public questionToBeUpdated: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private chapterService: ChapterService,
    private curriculumService: CurriculumService,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    const questionId = this.activatedRoute.snapshot.params["id"];

    this.questionForm.valueChanges.subscribe((data) => {
      this.previewQuestionText = data.questionText;
      this.previewAnswerOption1Text = data.answerOption1Text;
      this.previewAnswerOption2Text = data.answerOption2Text;
      this.previewAnswerOption3Text = data.answerOption3Text;
      this.previewAnswerOption4Text = data.answerOption4Text;
      this.previewAnswerOption5Text = data.answerOption5Text;
      this.previewAnswerOption6Text = data.answerOption6Text;
    });

    this.chapterService.getChapters().subscribe((data: any) => {
      if (data.data) {
        this.categorySelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
            curriculumId: category.curriculumId,
          };
        });

        this.categorySelectItemsViewable = this.categorySelectItems.filter(
          (categorySelectItem) => categorySelectItem.curriculumId == "1"
        );
      }

      this.curriculumService.getCurriculums().subscribe((data: any) => {
        if (data.data) {
          this.curriculumSelectItems = data.data.map((curriculum: any) => {
            return {
              value: curriculum.id,
              text: curriculum.name,
            };
          });
        }

        this.lessonService.getLessons().subscribe((data: any) => {
          if (data.data) {
            this.lessonSelectItems = data.data.map((lesson: any) => {
              return {
                value: lesson.id,
                text: lesson.name,
              };
            });

            this.lessonSelectItemsViewable = this.lessonSelectItems;
          }

          if (questionId) {
            this.questionService
              .getQuestionById(questionId)
              .subscribe((data: any) => {
                this.questionToBeUpdated = data.data;

                if (this.questionToBeUpdated.questionType == 1) {
                  this.isMultipleChoice = true;
                }

                if (this.questionToBeUpdated.questionMediaUrl) {
                  this.hasQuestionMedia = true;
                  this.previewMediaUrl =
                    this.IMG_ROOT + this.questionToBeUpdated.questionMediaUrl;
                }

                this.categorySelectItemsViewable =
                  this.categorySelectItems.filter(
                    (categorySelectItem) =>
                      categorySelectItem.curriculumId ==
                      this.questionToBeUpdated.curriculumId
                  );

                this.lessonSelectItemsViewable = this.lessonSelectItems.filter(
                  (lessonSelectItem) =>
                    lessonSelectItem.chapterId ==
                    this.questionToBeUpdated.lessonId
                );

                if (
                  this.questionToBeUpdated.answerOption1MediaUrl ||
                  this.questionToBeUpdated.answerOption2MediaUrl ||
                  this.questionToBeUpdated.answerOption3MediaUrl ||
                  this.questionToBeUpdated.answerOption4MediaUrl ||
                  this.questionToBeUpdated.answerOption5MediaUrl ||
                  this.questionToBeUpdated.answerOption6MediaUrl
                ) {
                  this.previewAnswerOption1MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption1MediaUrl;
                  this.previewAnswerOption2MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption2MediaUrl;
                  this.previewAnswerOption3MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption3MediaUrl;
                  this.previewAnswerOption4MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption4MediaUrl;
                  this.previewAnswerOption5MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption5MediaUrl;
                  this.previewAnswerOption6MediaUrl =
                    this.IMG_ROOT +
                    this.questionToBeUpdated.answerOption6MediaUrl;

                  this.hasAnswerWithMedia = true;
                }

                this.questionForm.patchValue({
                  questionText: this.questionToBeUpdated.questionText ?? null,
                  // questionMediaUrl:
                  //   this.questionToBeUpdated.questionMediaUrl ?? null,
                  questionMediaType:
                    this.questionToBeUpdated.questionMediaType ?? "1",
                  numberOfOptionsVisible:
                    this.questionToBeUpdated.numberOfOptionsVisible ?? "4",
                  questionType: this.questionToBeUpdated.questionType ?? 1,
                  correctAnswerText:
                    this.questionToBeUpdated.correctAnswerText ?? "",
                  answerOption1Text:
                    this.questionToBeUpdated.answerOption1Text ?? "",
                  // answerOption1MediaUrl:
                  //   this.questionToBeUpdated.answerOption1MediaUrl ?? null,
                  answerOption1MediaType:
                    this.questionToBeUpdated.answerOption1MediaType ?? "1",
                  answerOption2Text:
                    this.questionToBeUpdated.answerOption2Text ?? "",
                  // answerOption2MediaUrl:
                  //   this.questionToBeUpdated.answerOption2MediaUrl ?? null,
                  answerOption2MediaType:
                    this.questionToBeUpdated.answerOption2MediaType ?? "1",
                  answerOption3Text:
                    this.questionToBeUpdated.answerOption3Text ?? "",
                  // answerOption3MediaUrl:
                  //   this.questionToBeUpdated.answerOption3MediaUrl ?? null,
                  answerOption3MediaType:
                    this.questionToBeUpdated.answerOption3MediaType ?? "1",
                  answerOption4Text:
                    this.questionToBeUpdated.answerOption4Text ?? "",
                  // answerOption4MediaUrl:
                  //   this.questionToBeUpdated.answerOption4MediaUrl ?? null,
                  answerOption4MediaType:
                    this.questionToBeUpdated.answerOption4MediaType ?? "1",
                  answerOption5Text:
                    this.questionToBeUpdated.answerOption5Text ?? "",
                  // answerOption5MediaUrl:
                  //   this.questionToBeUpdated.answerOption5MediaUrl ?? null,
                  answerOption5MediaType:
                    this.questionToBeUpdated.answerOption5MediaType ?? "1",
                  answerOption6Text:
                    this.questionToBeUpdated.answerOption6Text ?? "",
                  // answerOption6MediaUrl:
                  //   this.questionToBeUpdated.answerOption6MediaUrl ?? null,
                  answerOption6MediaType:
                    this.questionToBeUpdated.answerOption6MediaType ?? "1",
                  chapterId: this.questionToBeUpdated.chapterId ?? "0",
                  lessonId: this.questionToBeUpdated.lessonId ?? "0",
                  curriculumId: this.questionToBeUpdated.curriculumId ?? "0",
                });

                // if (this.questionToBeUpdated.curriculumId) {
                //   if (
                //     !this.categorySelectItemsViewable.includes(
                //       window.localStorage.getItem("qf-selectedChapterId")
                //     )
                //   ) {
                //     this.questionForm.controls.chapterId.setValue("0");
                //   } else {
                //     this.questionForm.controls.chapterId.setValue(
                //       this.questionToBeUpdated.chapterId
                //     );
                //   }
                // }

                // if (this.questionToBeUpdated.chapterId) {
                //   this.lessonSelectItemsViewable =
                //     this.lessonSelectItems.filter(
                //       (lessonSelectItem) =>
                //         lessonSelectItem.chapterId ==
                //         this.questionToBeUpdated.chapterId
                //     );

                //   if (
                //     !this.lessonSelectItemsViewable.includes(
                //       window.localStorage.getItem("qf-selectedLessonId")
                //     )
                //   ) {
                //     this.questionForm.controls.lessonId.setValue("0");
                //   } else {
                //     this.questionForm.controls.lessonId.setValue(
                //       this.questionToBeUpdated.lessonId
                //     );
                //   }
                // }

                const correctOptionArray =
                  this.questionToBeUpdated.correctAnswerText.split(",");
                for (const option of correctOptionArray) {
                  this.questionForm
                    .get<any>(`isAnswer${option}Correct`)
                    ?.setValue(true);
                }
              });
          }
        });
      });
    });

    this.questionForm.controls.curriculumId.valueChanges.subscribe(
      (curriculumId) => {
        // this.questionForm.controls.chapterId.setValue("0");
        this.categorySelectItemsViewable = this.categorySelectItems.filter(
          (categorySelectItem) =>
            categorySelectItem.curriculumId == curriculumId
        );
        window.localStorage.setItem("qf-selectedCurriculumId", curriculumId);
      }
    );

    this.questionForm.controls.chapterId.valueChanges.subscribe((chapterId) => {
      // this.questionForm.controls.lessonId.setValue("0");
      window.localStorage.setItem("qf-selectedChapterId", chapterId);
    });

    this.questionForm.controls.lessonId.valueChanges.subscribe((lessonId) => {
      window.localStorage.setItem("qf-selectedLessonId", lessonId);
    });
  }

  onSubmit() {
    if (this.isFormValid()) {
      const correctAnswerArray = [];

      if (this.questionForm.controls.isAnswer1Correct.value) {
        correctAnswerArray.push(1);
      }

      if (this.questionForm.controls.isAnswer2Correct.value) {
        correctAnswerArray.push(2);
      }

      if (this.questionForm.controls.isAnswer3Correct.value) {
        correctAnswerArray.push(3);
      }

      if (this.questionForm.controls.isAnswer4Correct.value) {
        correctAnswerArray.push(4);
      }

      if (this.questionForm.controls.isAnswer5Correct.value) {
        correctAnswerArray.push(5);
      }

      if (this.questionForm.controls.isAnswer6Correct.value) {
        correctAnswerArray.push(6);
      }

      const correctAnswerText = correctAnswerArray.join(",");

      this.questionForm.controls.correctAnswerText.setValue(correctAnswerText);

      if (this.questionForm.controls.chapterId.value != "0") {
        this.questionForm.controls.curriculumId.setValue(null);
      } else if (this.questionForm.controls.curriculumId.value != "0") {
        this.questionForm.controls.chapterId.setValue(null);
      }

      if (this.questionForm.controls.lessonId.value == "0") {
        this.questionForm.controls.lessonId.setValue(null);
      }

      const formData = new FormData();

      if (this.questionForm.get("questionMediaUrl")?.value) {
        formData.append(
          "questionMediaUrl",
          this.questionForm.get("questionMediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption1MediaUrl")?.value) {
        formData.append(
          "answerOption1MediaUrl",
          this.questionForm.get("answerOption1MediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption2MediaUrl")?.value) {
        formData.append(
          "answerOption2MediaUrl",
          this.questionForm.get("answerOption2MediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption3MediaUrl")?.value) {
        formData.append(
          "answerOption3MediaUrl",
          this.questionForm.get("answerOption3MediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption4MediaUrl")?.value) {
        formData.append(
          "answerOption4MediaUrl",
          this.questionForm.get("answerOption4MediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption5MediaUrl")?.value) {
        formData.append(
          "answerOption5MediaUrl",
          this.questionForm.get("answerOption5MediaUrl")?.value
        );
      }
      if (this.questionForm.get("answerOption6MediaUrl")?.value) {
        formData.append(
          "answerOption6MediaUrl",
          this.questionForm.get("answerOption6MediaUrl")?.value
        );
      }

      if (!this.questionToBeUpdated) {
        // Create
        this.questionService
          .createQuestion(this.questionForm.value)
          .subscribe((data: any) => {
            this.questionService
              .uploadImages(data.data.id, formData)
              .subscribe();

            this.router.navigate(["/question"]);
          });
      } else {
        // Update
        this.questionService
          .update(this.questionToBeUpdated.id, this.questionForm.value)
          .subscribe(() => {
            this.questionService
              .uploadImages(this.questionToBeUpdated.id, formData)
              .subscribe();

            this.router.navigate(["/question"]);
          });
      }
    }
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.questionForm.patchValue({
        [field]: file,
      });

      if (field == "questionMediaUrl") {
        this.previewMediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption1MediaUrl") {
        this.previewAnswerOption1MediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption2MediaUrl") {
        this.previewAnswerOption2MediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption3MediaUrl") {
        this.previewAnswerOption3MediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption4MediaUrl") {
        this.previewAnswerOption4MediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption5MediaUrl") {
        this.previewAnswerOption5MediaUrl = URL.createObjectURL(file);
      } else if (field == "answerOption6MediaUrl") {
        this.previewAnswerOption6MediaUrl = URL.createObjectURL(file);
      }
    }
  }

  private isFormValid(): boolean {
    if (!this.questionForm.controls.questionText.value.trim()) {
      return false;
    }

    // if (
    //   this.hasQuestionMedia && (
    //   !this.questionForm.controls.questionMediaUrl.value
    //   )
    // ) {
    //   return false;
    // }

    if (
      this.isMultipleChoice &&
      this.questionForm.controls.numberOfOptionsVisible.value < 2
    ) {
      return false;
    }

    if (
      !(
        this.questionForm.controls.isAnswer1Correct.value ||
        this.questionForm.controls.isAnswer2Correct.value ||
        this.questionForm.controls.isAnswer3Correct.value ||
        this.questionForm.controls.isAnswer4Correct.value ||
        this.questionForm.controls.isAnswer5Correct.value ||
        this.questionForm.controls.isAnswer6Correct.value
      )
    ) {
      return false;
    }

    for (
      let i = 1;
      i <= this.questionForm.controls.numberOfOptionsVisible.value;
      i++
    ) {
      if (
        !(
          this.questionForm.get(`answerOption${i}Text`) &&
          this.questionForm.controls[`answerOption${i}Text`].value.trim()
        )
      ) {
        return false;
      }
    }

    if (
      this.questionForm.controls.chapterId.value == "0" &&
      this.questionForm.controls.curriculumId.value == "0"
    ) {
      return false;
    }

    return true;
  }
}
