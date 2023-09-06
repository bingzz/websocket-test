import { Component, OnInit } from '@angular/core'
import io from 'socket.io-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private socket: any
  notification = 0

  constructor () {
    this.socket = io('http://localhost:3000')
  }

  sendDataUpdate() {
    const data = { username: 'irving', password: '12345' }
    this.socket.emit('dataUpdate', data)
  }

  disconnect() {
    this.socket.emit('disconnect')
  }

  ngOnInit(): void {
    this.socket.on('getNotification', (data: number) => {
      this.notification = data
    })
  }
}
