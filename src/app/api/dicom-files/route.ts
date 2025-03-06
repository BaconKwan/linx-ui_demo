import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dirPath = searchParams.get('path');

    if (!dirPath) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    // 获取完整路径
    const fullPath = path.join(process.cwd(), 'public', dirPath);

    // 检查目录是否存在
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    // 读取目录中的所有文件
    const files = fs.readdirSync(fullPath)
      .filter(file => file.toLowerCase().endsWith('.dcm'))
      .sort((a, b) => {
        // 按文件名数字排序
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    // 确保返回数组
    return NextResponse.json(files || []);
  } catch (error) {
    console.error('Error reading DICOM files:', error);
    return NextResponse.json({ error: 'Failed to read DICOM files' }, { status: 500 });
  }
} 