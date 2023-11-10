// api.js
import apiIp from './config';

// สร้างฟังก์ชันเพื่อส่งค่า apiIp ออกไปให้โมดูลอื่นๆ
export function getApiIp() {
  return apiIp;
}

// สร้างฟังก์ชันอื่นๆ ที่เกี่ยวข้องกับการใช้งาน api ตรงนี้
