import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';

import { User } from '../../models/community/user';
import { UserFilters } from '../../models/community/user-filters';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BIRTHDAYS_OF_THE_DAY_URL: string = "http://localhost:4200/api/users/birthdays";
  private LAST_SUBSCRIBES_URL: string = "http://localhost:4200/api/users/lastsubscribes";
  isLocal: boolean = false;

  // Observable object to transfer user filters to the user list component
  filterSubject: Subject<Object> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Filter users
   * 
   * @param gender 
   * @param ageCategory 
   * @param pseudo 
   * @param region 
   * @param department 
   * @param page 
   * @param size 
   * @param sort 
   */
  public filterUsers(gender: string, ageCategory :string, pseudo: string, region: number, department: number, page: number, size: number, sort: string) :Observable<User[]> {
    region = 0;
    department = 0;
    
    // Set parameters
    const params = new HttpParams()
    .set('gender', gender)
    .set('ageCategory', ageCategory)
    .set('login', pseudo)
    .set('region', region.toString())
    .set('department', department.toString())
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

    return this.http.get<User[]>('http://localhost:8080/api/users/filter', {params});
  }

  /**
   * Get last subscribes users
   */
  public getLastSubscribes(): Observable<User[]> {
    if(this.isLocal) {
        return of(this.users.slice());
    } else {
      return of(this.users.slice());
      //return this.http.get<User>(this.LAST_SUBSCRIBES_URL);
    }
  }

    /**
   * Get birthdays of the day
   */
  public getBirthdays(): Observable<User[]> {
    if(this.isLocal) {
        return of(this.users.slice());
    } else {
      return of(this.users.slice());
      //return this.http.get<User>(this.BIRTHDAYS_OF_THE_DAY_URL);
    }
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/api/users");
  }

  users :User[];

/*  users :User[] = [{
    "id": 1,
    "firstname": "Jewell",
    "lastname": "Lamps",
    "email": "jlamps0@jiathis.com",
    "gender": "Female",
    "avatar": "https://robohash.org/enimvoluptasenim.png?size=50x50&set=set1",
    "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "birthday": "10/11/2019",
    "dateCreation": "26.02.2020",
    "age": 23,
    "city": "São Sepé"
  }, {
    "id": 2,
    "firstname": "Iorgos",
    "lastname": "Dowker",
    "email": "idowker1@sitemeter.com",
    "gender": "Male",
    "avatar": "https://robohash.org/etquiafugit.png?size=50x50&set=set1",
    "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    "birthday": "03/06/2019",
    "dateCreation": "07.01.2020",
    "age": 90,
    "city": "Werinama"
  }, {
    "id": 3,
    "firstname": "Augustine",
    "lastname": "Fabry",
    "email": "afabry2@virginia.edu",
    "gender": "Male",
    "avatar": "https://robohash.org/eossintdolor.png?size=50x50&set=set1",
    "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "birthday": "15/02/2020",
    "dateCreation": "27.06.2019",
    "age": 52,
    "city": "Karangbenda"
  }, {
    "id": 4,
    "firstname": "Sully",
    "lastname": "Dolling",
    "email": "sdolling3@wired.com",
    "gender": "Male",
    "avatar": "https://robohash.org/veniammolestiaedolorem.png?size=50x50&set=set1",
    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    "birthday": "15/03/2020",
    "dateCreation": "31.01.2020",
    "age": 73,
    "city": "Nyandoma"
  }, {
    "id": 5,
    "firstname": "Kele",
    "lastname": "Lodo",
    "email": "klodo4@surveymonkey.com",
    "gender": "Male",
    "avatar": "https://robohash.org/quiacorruptisunt.png?size=50x50&set=set1",
    "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    "birthday": "12/09/2019",
    "dateCreation": "18.12.2019",
    "age": 61,
    "city": "Sangkalputung"
  }, {
    "id": 6,
    "firstname": "Glynis",
    "lastname": "Haukey",
    "email": "ghaukey5@latimes.com",
    "gender": "Female",
    "avatar": "https://robohash.org/solutaetexercitationem.png?size=50x50&set=set1",
    "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "birthday": "01/01/2020",
    "dateCreation": "20.03.2019",
    "age": 64,
    "city": "Lixu"
  }, {
    "id": 7,
    "firstname": "Currey",
    "lastname": "Niblo",
    "email": "cniblo6@1688.com",
    "gender": "Male",
    "avatar": "https://robohash.org/quametnihil.png?size=50x50&set=set1",
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    "birthday": "18/09/2019",
    "dateCreation": "23.06.2019",
    "age": 31,
    "city": "Všetaty"
  }, {
    "id": 8,
    "firstname": "Byram",
    "lastname": "Theuss",
    "email": "btheuss7@desdev.cn",
    "gender": "Male",
    "avatar": "https://robohash.org/doloresporronisi.png?size=50x50&set=set1",
    "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    "birthday": "01/09/2019",
    "dateCreation": "12.01.2020",
    "age": 39,
    "city": "Bechyně"
  }, {
    "id": 9,
    "firstname": "Granville",
    "lastname": "Marlen",
    "email": "gmarlen8@mlb.com",
    "gender": "Male",
    "avatar": "https://robohash.org/rationeundeoccaecati.png?size=50x50&set=set1",
    "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    "birthday": "28/11/2019",
    "dateCreation": "01.10.2019",
    "age": 46,
    "city": "San Antonio"
  }, {
    "id": 10,
    "firstname": "Dionis",
    "lastname": "Menchenton",
    "email": "dmenchenton9@tinypic.com",
    "gender": "Female",
    "avatar": "https://robohash.org/vitaeomnisquod.png?size=50x50&set=set1",
    "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "birthday": "12/10/2019",
    "dateCreation": "21.04.2019",
    "age": 31,
    "city": "København"
  }, {
    "id": 11,
    "firstname": "Georgetta",
    "lastname": "Cowill",
    "email": "gcowilla@ucsd.edu",
    "gender": "Female",
    "avatar": "https://robohash.org/liberoatquemolestiae.png?size=50x50&set=set1",
    "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "birthday": "12/03/2020",
    "dateCreation": "10.03.2020",
    "age": 37,
    "city": "Dayton"
  }, {
    "id": 12,
    "firstname": "Audrie",
    "lastname": "Pirolini",
    "email": "apirolinib@aboutads.info",
    "gender": "Female",
    "avatar": "https://robohash.org/totamerrorrepudiandae.png?size=50x50&set=set1",
    "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
    "birthday": "11/12/2019",
    "dateCreation": "20.10.2019",
    "age": 36,
    "city": "Tierralta"
  }, {
    "id": 13,
    "firstname": "Xenia",
    "lastname": "Hanington",
    "email": "xhaningtonc@economist.com",
    "gender": "Female",
    "avatar": "https://robohash.org/utquisrem.png?size=50x50&set=set1",
    "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "birthday": "17/02/2020",
    "dateCreation": "03.01.2020",
    "age": 89,
    "city": "Toulouse"
  }, {
    "id": 14,
    "firstname": "Laina",
    "lastname": "Titheridge",
    "email": "ltitheridged@home.pl",
    "gender": "Female",
    "avatar": "https://robohash.org/quaeearumaut.png?size=50x50&set=set1",
    "description": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    "birthday": "26/09/2019",
    "dateCreation": "02.11.2019",
    "age": 30,
    "city": "Juuka"
  }, {
    "id": 15,
    "firstname": "Meta",
    "lastname": "Ogley",
    "email": "mogleye@disqus.com",
    "gender": "Female",
    "avatar": "https://robohash.org/aliquametvero.png?size=50x50&set=set1",
    "description": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    "birthday": "16/04/2019",
    "dateCreation": "10.12.2019",
    "age": 51,
    "city": "Middelburg"
  }, {
    "id": 16,
    "firstname": "Florinda",
    "lastname": "Boller",
    "email": "fbollerf@drupal.org",
    "gender": "Female",
    "avatar": "https://robohash.org/eligendiquisprovident.png?size=50x50&set=set1",
    "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "birthday": "26/02/2020",
    "dateCreation": "07.02.2020",
    "age": 87,
    "city": "Messina"
  }, {
    "id": 17,
    "firstname": "Berti",
    "lastname": "Vitte",
    "email": "bvitteg@live.com",
    "gender": "Female",
    "avatar": "https://robohash.org/quiaeaquequo.png?size=50x50&set=set1",
    "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "birthday": "15/09/2019",
    "dateCreation": "25.09.2019",
    "age": 26,
    "city": "Chechenglu"
  }, {
    "id": 18,
    "firstname": "Stacie",
    "lastname": "Cordero",
    "email": "scorderoh@cam.ac.uk",
    "gender": "Female",
    "avatar": "https://robohash.org/etteneturharum.png?size=50x50&set=set1",
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    "birthday": "20/08/2019",
    "dateCreation": "16.05.2019",
    "age": 81,
    "city": "Ponte"
  }, {
    "id": 19,
    "firstname": "Enrico",
    "lastname": "Signori",
    "email": "esignorii@tinypic.com",
    "gender": "Male",
    "avatar": "https://robohash.org/laboriosamquomagnam.png?size=50x50&set=set1",
    "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    "birthday": "30/07/2019",
    "dateCreation": "29.08.2019",
    "age": 52,
    "city": "Kuala Lumpur"
  }, {
    "id": 20,
    "firstname": "Jeanna",
    "lastname": "Simonian",
    "email": "jsimonianj@sun.com",
    "gender": "Female",
    "avatar": "https://robohash.org/nequelaborumarchitecto.png?size=50x50&set=set1",
    "description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "birthday": "31/08/2019",
    "dateCreation": "16.06.2019",
    "age": 41,
    "city": "Yokotemachi"
  }]
*/
}
