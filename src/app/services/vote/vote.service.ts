import { Injectable } from '@angular/core';
import { Firestore, Unsubscribe, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Logger } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  niceVote: string = '';
  uglyVote: string = '';

  constructor(private firestore: Firestore,
    private authService: AuthService,
    private logger: Logger) { }

  async emitVote(picture: string, gallery: string) {
    try {
      const user = this.authService.user?.email;
      const ref = doc(this.firestore, 'votaciones', user as string);
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        if (gallery === 'lindas') {
          this.niceVote = picture;
          await updateDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          this.uglyVote = picture;
          await updateDoc(ref, {
            feas: picture
          });
        }
      } else {
        if (gallery === 'lindas') {
          this.niceVote = picture;
          await setDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          this.uglyVote = picture;
          await setDoc(ref, {
            feas: picture
          });
        }
      }
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getNiceVote() {
    if (this.niceVote) {
      return this.niceVote;
    } else {
      const vote = await this.getVote('lindas');
      this.niceVote = vote;
      return vote;
    }
  }

  async getUglyVote() {
    if (this.uglyVote) {
      return this.uglyVote;
    } else {
      const vote = await this.getVote('feas');
      this.uglyVote = vote;
      return vote;
    }
  }

  private async getVote(gallery: string) {
    try {
      const user = this.authService.user?.email;
      const docRef = doc(this.firestore, 'votaciones', user!);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data[gallery];
      }
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getAllNice(): Promise<string[]> {
    return await this.getAllByCategory('lindas');
  }

  async getAllUgly(): Promise<string[]> {
    return await this.getAllByCategory('feas');
  }

  private async getAllByCategory(category: string): Promise<string[]> {
    const result: string[] = [];
    try {
      const q = query(collection(this.firestore, 'votaciones'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data[category]) {
          result.push(data[category]);
        }
      });
    } catch (e: any) {
      this.logger.logError(e);
    } finally {
      return result;
    }
  }
}
