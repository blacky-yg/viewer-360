const content1 = document.querySelector(".pano1");
const content2 = document.querySelector(".pano2");

const img = ["asset/pano1.jpg", "asset/pano2.jpg", "asset/pano3.jpeg", "asset/pano4.jpeg"];

const video = ["asset/video1.mp4", "asset/video2.mp4"];

const sounds = ["asset/sound1.mp3", "asset/sound2.mp3"];

const pano_img = [new PANOLENS.ImagePanorama(img[0]),
		new PANOLENS.ImagePanorama(img[1]), new PANOLENS.ImagePanorama(img[2]),
		new PANOLENS.ImagePanorama(img[3]), new PANOLENS.ImagePanorama(img[4])];

const pano_video = [new PANOLENS.VideoPanorama(video[0]),
					new PANOLENS.VideoPanorama(video[1])];

const viewer1 = new PANOLENS.Viewer({
	container: content1,
	output: 'console',
	autoRotate: true,
	autoRotateSpeed: 0.3
});

const viewer2 = new PANOLENS.Viewer({
	container: content2,
	output: 'console',
	autoRotate: true,
	autoRotateSpeed: 0.3
});

const audioPlayButton1 = document.querySelector('#audio1');
const audioPlayButton2 = document.querySelector('#audio2');

audioPlayButton1.style.display = 'block';
audioPlayButton1.addEventListener('touchstart', function() {
	var audioCtx = listener.context;
	var buffer = audioCtx.createBuffer(1, 1, 22050);
	var source = audioCtx.createBufferSource();

	source.buffer = audioBuffer;
	source.connect(audioCtx.destination);
	source.start();
});

audioPlayButton2.style.display = 'block';
audioPlayButton2.addEventListener('touchstart', function() {
	var audioCtx = listener.context;
	var buffer = audioCtx.createBuffer(1, 1, 22050);
	var source = audioCtx.createBufferSource();

	source.buffer = audioBuffer;
	source.connect(audioCtx.destination);
	source.start();
});

var listener1 = new THREE.AudioListener();
var listener2 = new THREE.AudioListener();
var audioLoader1 = new THREE.AudioLoader();
var audioLoader2 = new THREE.AudioLoader();
var sound1 = new THREE.PositionalAudio(listener1);
var sound2 = new THREE.PositionalAudio(listener2);

audioLoader1.load(sounds[0], function(buffer) {
	audioBuffer = buffer;
	sound1.setBuffer(buffer);
	sound1.setRefDistance(100);
	sound1.setLoop(true);
	sound1.play();
});

audioPlayButton1.addEventListener('click', function() {
	if (sound1.isPlaying)
		sound1.stop();
	else
		sound1.play();
});

audioLoader2.load(sounds[1], function(buffer) {
	audioBuffer = buffer;
	sound2.setBuffer(buffer);
	sound2.setRefDistance(100);
	sound2.setLoop(true);
	sound2.play();
});

audioPlayButton2.addEventListener('click', function() {
	if (sound2.isPlaying)
		sound2.stop();
	else
		sound2.play();
});

pano_img[0].link(pano_img[1], new THREE.Vector3(-4436.71, -1198.60, -1965.38));
pano_img[1].link(pano_img[0], new THREE.Vector3(4454.68, -10.58, 2254.64));
pano_img[0].link(pano_video[0], new THREE.Vector3(-4869.50, -1100.36, 107.80));
pano_video[0].link(pano_img[0], new THREE.Vector3(-4412.97, 539.47, 2265.19));

pano_img[2].link(pano_img[3], new THREE.Vector3(-3016.63, -1455.39, -3700.21));
pano_img[3].link(pano_img[2], new THREE.Vector3(4901.73, -909.10, 218.74));
pano_img[2].link(pano_video[1], new THREE.Vector3(2092.23, -736.35, -4474.98));
pano_video[1].link(pano_img[2], new THREE.Vector3(3294.23, -340.28, -3740.19));

viewer1.add(pano_img[0], pano_img[1], pano_video[0]);
viewer2.add(pano_img[2], pano_img[3], pano_video[1]);