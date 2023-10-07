import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Logger } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

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
          await updateDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          await updateDoc(ref, {
            feas: picture
          });
        }
      } else {
        if (gallery === 'lindas') {
          await setDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          await setDoc(ref, {
            feas: picture
          });
        }
      }
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getVote(gallery: string) {
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
    const result: string[] = [];
    try {
      const q = query(collection(this.firestore, 'votaciones'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const data = doc.data();
        result.push(data['lindas']);
      });
    } catch (e: any) {
      this.logger.logError(e);
    } finally {
      return result;
    }
  }
}
