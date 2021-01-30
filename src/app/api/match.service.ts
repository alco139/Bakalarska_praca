import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private router: Router) { }
}
