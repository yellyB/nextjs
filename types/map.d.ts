// 구글 map api의 타입을 편하게 사용하기 위해
// @types/googlemaps를 설치 후 타입 사용

declare module "googlemaps";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
