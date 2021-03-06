import { Component } from '@angular/core';

import { NavController , AlertController,ActionSheetController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 // items: FirebaseListObservable<any[]>;
  songs: FirebaseListObservable<any>;

//msgVal:any;
constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, af: AngularFire,public alertCtrl: AlertController) {
  this.songs = af.database.list('/songs');
}
  //todo(todo:any){
   //this.items.push({items:todo});
   // this.msgVal='';
  //}
addSong(){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.push({
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}
  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }

      ]
    });
    actionSheet.present();
  }
  
  removeSong(songId: string){
  this.songs.remove(songId);
}

    updateSong(songId, songTitle){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Update the name for this song",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: songTitle
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.songs.update(songId, {
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }
  

}
