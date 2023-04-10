import { Component, OnInit } from '@angular/core';
import {FaceSnap} from "../models/face-snap.models";
import {FaceSnapsService} from "../services/face-snap.services";
import {Observable} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent {

  faceSnaps$!: Observable<FaceSnap[]>;
  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
      this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }


}
