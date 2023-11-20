// api.js
import { apiIp, apiHisIp } from './config';

// สร้างฟังก์ชันที่ให้ค่า API URLs ตามต้องการ
export function getApiIp() {
  return apiIp;
}

export function getApiHisIp() {
  return apiHisIp;
}

// สร้างฟังก์ชันอื่น ๆ ที่เกี่ยวข้องกับการใช้งาน API ตรงนี้
