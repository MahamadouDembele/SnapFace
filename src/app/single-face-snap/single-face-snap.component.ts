import {Component} from '@angular/core';
import {FaceSnap} from "../models/face-snap.models";
import {FaceSnapsService} from "../services/face-snap.services";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent {

  buttonText!: string;
  faceSnap$!: Observable<FaceSnap>;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute,
              private router: Router) {}


  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }


  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.buttonText = 'Oops, unSnap!')
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = 'Oh Snap!')
      );
    }
  }

  onDelete(faceSnapId: number) {
      this.faceSnapsService.deleteFaceSnap(faceSnapId).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps'))
      ).subscribe();
  }

}
