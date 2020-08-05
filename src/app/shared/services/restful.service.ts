import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // TODO - Check if 'contentType' is needed
  private static buildTokenHeaders(contentType?: boolean) {
    let headers = new HttpHeaders();
    if (contentType) { headers = headers.append('Content-Type', 'application/json'); }
    let value;
    if ((value = localStorage.getItem('jwt_token')) != null) {
      headers = headers.append('JWT-Token', value);
    }
    return headers;
  }

  // ===========================
  // ======> LOGS METHODS ======
  // ===========================

  getLogs() {
    return this.http.get(this.baseUrl + '/logs', {
      headers: RestfulService.buildTokenHeaders(),
        withCredentials: true
    });
  }

  clearLogs() {
    return this.http.delete(this.baseUrl + '/logs', {
      headers: RestfulService.buildTokenHeaders(),
        withCredentials: true
    });
  }

  // ================================
  // ======> DASHBOARD METHODS ======
  // ================================

  getDashboard() {
    return this.http.get(this.baseUrl + '/dashboard', {
      headers: RestfulService.buildTokenHeaders(),
        withCredentials: true
    });
  }

  // ==============================
  // ======> DOMAINS METHODS ======
  // ==============================

  // CRUD START -->

  createDomain(data) {
    return this.http.post(this.baseUrl + '/domains', data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  getDomains() {
    return this.http.get(this.baseUrl + '/domains', {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  updateDomain(uuid, data) {
    return this.http.put(this.baseUrl + '/domains/' + uuid, data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  deleteDomain(uuid) {
    return this.http.delete(this.baseUrl + '/domains/' + uuid, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  // <-- CRUD END
  // POWER MANAGEMENT START -->

  startDomain(uuid) {
    return this.http.put(this.baseUrl + '/domains/' + uuid + '/start', null, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  shutdownDomain(uuid) {
    return this.http.put(this.baseUrl + '/domains/' + uuid + '/shutdown', null, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  rebootDomain(uuid) {
    return this.http.put(this.baseUrl + '/domains/' + uuid + '/reboot', null, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  // <-- POWER MANAGEMENT END

  // ==========================
  // ======> LAB METHODS ======
  // ==========================

  // CRUD START -->

  createLab(data) {
    return this.http.post(this.baseUrl + '/labs', data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  getLabs() {
    return this.http.get(this.baseUrl + '/labs', {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  updateLab(uuid, data) {
    return this.http.put(this.baseUrl + '/labs/' + uuid, data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  deleteLab(uuid) {
    return this.http.delete(this.baseUrl + '/labs/' + uuid, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  // <-- CRUD END

  // ===========================
  // ======> HOST METHODS ======
  // ===========================

  // CRUD START -->

  createHost(data) {
    return this.http.post(this.baseUrl + '/hosts', data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  getHosts(lab_uuid) {
    console.log(this.baseUrl + '/hosts/' + lab_uuid);
    return this.http.get(this.baseUrl + '/hosts/' + lab_uuid, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  updateHost(uuid, data) {
    return this.http.put(this.baseUrl + '/hosts/' + uuid, data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  deleteHost(uuid) {
    return this.http.delete(this.baseUrl + '/hosts/' + uuid, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  // <-- CRUD END

  // ===============================
  // ======> TEMPLATE METHODS ======
  // ===============================

  // CRUD START -->

  createTemplate(data) {
    return this.http.post(this.baseUrl + '/templates', data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  getTemplates() {
    return this.http.get(this.baseUrl + '/templates', {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  updateTemplate(uuid, data) {
    return this.http.put(this.baseUrl + '/templates/' + uuid, data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  deleteTemplate(uuid) {
    return this.http.delete(this.baseUrl + '/templates/' + uuid, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

  // <-- CRUD END

  deployTemplate(uuid, data) {
    return this.http.post(this.baseUrl + '/templates/' + uuid, data, {
      headers: RestfulService.buildTokenHeaders(),
      withCredentials: true
    });
  }

}
