import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Drawing } from './drawing';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth,) { }

  updateDrawing(data: any) {
    console.log('JSON.parse(localStorage.getItem("user") ?? "{}").uid :>> ', JSON.parse(localStorage.getItem("user") ?? "{}").uid);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("drawings")
        .doc(JSON.parse(localStorage.getItem("user") ?? "{}").uid)
        .set({ drawing: data }, { merge: true })
        .then(res => { }, err => reject(err));
    });
  }

  getDrawing(): Promise<DocumentSnapshot<Drawing>> {
    return this.firestore
      .collection("drawings")
      .doc(JSON.parse(localStorage.getItem("user") ?? "{}").uid)
      .get().toPromise() as Promise<DocumentSnapshot<Drawing>>
  }
}
