import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import RecordRTC from 'recordrtc/RecordRTC.min'
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxTypedJsComponent } from 'ngx-typed-js';
@Component({
	selector: 'template-home',
	templateUrl: './home.html',
	styleUrls: ['./home.scss'],
	encapsulation: ViewEncapsulation.None
})

export class HomeTemplate implements AfterViewInit {
	enterDataForm: FormGroup = this.formBuilder.group({
		text: ['', Validators.required]
	})
	diplayText:string = ''
	videoLength: number = 20000
	private stream: any //MediaStream;
	private recordRTC: any;
	public resumeData:any = {
		'intro':{
			video:'',
			text:'',
			styleType:''
		},
		'prof': {
			video:'',
			text:'',
			styleType:''
		},
		'sumUp': {
			video:'',
			text:'',
			styleType:''
		}
	}
	showTabs: boolean = false;
	showVideo: boolean = false;
	previewVideo: boolean = false;
	activeTab: string = 'tabintro';
	recording: boolean = false;
	@ViewChild('video') video:any
	@ViewChild('preVideo') preVideo:any
	@ViewChild('endVideo') endVideo:any
	@ViewChild(NgxTypedJsComponent)
	public typed: NgxTypedJsComponent = new NgxTypedJsComponent;
	constructor(
		private sanitizer: DomSanitizer,
		private formBuilder: FormBuilder,
		public ngxTypedJsComponent: NgxTypedJsComponent
	) {
	}
	ngAfterViewInit() {
		let video:HTMLVideoElement = this.video.nativeElement;
		video.muted = false;
		video.controls = true;
		video.autoplay = false;
	}
  
	setActiveData (tabIndex: string) {
		this.activeTab = tabIndex
		this.showVideo = false;
		this.enterDataForm.reset()
	}

	toggleControls() {
		let video: HTMLVideoElement = this.video.nativeElement;
		video.muted = !video.muted;
		video.controls = !video.controls;
		video.autoplay = !video.autoplay;
	}
  
	successCallback(stream: MediaStream) {
		var options = {
			mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
			audioBitsPerSecond: 128000,
			videoBitsPerSecond: 128000,
			bitsPerSecond: 128000 // if this line is provided, skip above two
		};
		this.stream = stream;
		this.recordRTC = RecordRTC(stream, options);
		this.recordRTC.startRecording();
		let video: HTMLVideoElement = this.video.nativeElement;
		// console.log('stream', stream)
		//   video.src = window.URL.createObjectURL(stream);
		video.srcObject = stream
		this.toggleControls();
	}
  
	errorCallback() {
	  //handle error here
	}
	enterData() {
		if (this.enterDataForm.valid) {
			this.resumeData[this.activeTab].text = this.enterDataForm.value.text
		}
	}
	processVideo(audioVideoWebMURL:any) {
		let video: HTMLVideoElement = this.video.nativeElement;
		let recordRTC = this.recordRTC;
		video.src = audioVideoWebMURL;
		this.toggleControls();
		var recordedBlob = recordRTC.getBlob();
		console.log(this.activeTab, 'recordedBlob', recordedBlob)
		this.resumeData[this.activeTab].video = recordRTC.getBlob();
		// let _this = this
		// recordRTC.getDataURL(function (dataURL:any) {
		// 	_this.resumeData[_this.activeTab] = dataURL
		// 	// console.log(_this.activeTab, 'dataURL', dataURL)
		// });
	}
  
	preview() {
		this.previewVideo = true;
		let video: HTMLVideoElement = this.preVideo.nativeElement;
		video.src = window.URL.createObjectURL(this.resumeData[this.activeTab].video);
		// video.srcObject = this.resumeData[this.activeTab].video
	}

	startRecording() {
		this.recording = true
		let mediaConstraints:any = {
			video: {
				mandatory: {
					minWidth: 1280,
					minHeight: 720
				}
			}, audio: true
		};
	  	navigator.mediaDevices
		.getUserMedia(mediaConstraints)
		.then(this.successCallback.bind(this), this.errorCallback.bind(this));
		let _this = this;
		setTimeout(() => {
			_this.stopRecording()
		}, this.videoLength);
	}
  
	stopRecording() {
		let recordRTC = this.recordRTC;
		recordRTC.stopRecording(this.processVideo.bind(this));
		let stream = this.stream;
		stream.getAudioTracks().forEach((track:any) => track.stop());
		stream.getVideoTracks().forEach((track:any) => track.stop());
		this.showVideo = false;
		this.recording = false
	}

	createVideo () {
		this.activeTab='end'
	}

	submit() {
		alert('This application is clinet side only. Not ready to submit.')
	}
	play() {
		let video: HTMLVideoElement = this.endVideo.nativeElement;
		video.src = window.URL.createObjectURL(this.resumeData['intro'].video);
		this.diplayText = this.resumeData['intro'].text
		setTimeout(() => {
			video.src = window.URL.createObjectURL(this.resumeData['prof'].video);
			this.diplayText = this.resumeData['prof'].text
			video.play();
			setTimeout(() => {
				video.src = window.URL.createObjectURL(this.resumeData['sumUp'].video);
				this.diplayText = this.resumeData['sumUp'].text
				video.play();
			}, this.videoLength);
		}, this.videoLength);
		video.play();
	}
	createResume () {
		this.showTabs = true;
		this.setActiveData('intro')
	}
}