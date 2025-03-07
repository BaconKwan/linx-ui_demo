import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Button, 
  List, 
  Row, 
  Col, 
  message 
} from 'antd';
import { 
  FileImageOutlined, 
  WarningOutlined, 
  FileTextOutlined,
  DragOutlined,
  ZoomInOutlined,
  ControlOutlined,
  BorderOutlined,
  LineOutlined,
  RetweetOutlined,
  UndoOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { dicomStudies } from '@/mocks';

const { Text, Title } = Typography;

/**
 * 影像资料标签页组件
 * 展示患者的所有医学影像检查结果
 */
const ImagingTab: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [selectedTool, setSelectedTool] = useState('Wwwc');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewport, setViewport] = useState({
    scale: 1,
    translation: { x: 0, y: 0 },
    voi: { windowWidth: 400, windowCenter: 40 },
    rotation: 0,
  });

  // 初始化 Cornerstone
  useEffect(() => {
    // 确保代码只在客户端运行
    if (typeof window === 'undefined') return;
    if (!viewerRef.current) return;

    const initCornerstone = async () => {
      try {
        // 动态导入 Cornerstone 相关库
        const [
          cs,
          csTools,
          csWadoImageLoader,
          dicomParser,
          Hammer
        ] = await Promise.all([
          import('cornerstone-core'),
          import('cornerstone-tools'),
          import('cornerstone-wado-image-loader'),
          import('dicom-parser'),
          import('hammerjs')
        ]);
        
        const element = viewerRef.current;
        if (!element) return;
        
        cs.default.enable(element);
        
        csWadoImageLoader.default.external.cornerstone = cs.default;
        csWadoImageLoader.default.external.dicomParser = dicomParser.default;
        csWadoImageLoader.default.configure({
          beforeSend: (xhr: XMLHttpRequest) => {
            xhr.responseType = 'arraybuffer';
          }
        });

        csTools.default.external.cornerstone = cs.default;
        csTools.default.external.Hammer = Hammer.default;
        csTools.default.init({
          mouseEnabled: true,
          touchEnabled: true,
          globalToolSyncEnabled: false,
          showSVGCursors: true
        });

        // 注册所需的工具
        csTools.default.addTool(csTools.default.PanTool);
        csTools.default.addTool(csTools.default.ZoomTool);
        csTools.default.addTool(csTools.default.WwwcTool);
        csTools.default.addTool(csTools.default.RectangleRoiTool);
        csTools.default.addTool(csTools.default.LengthTool);
        csTools.default.addTool(csTools.default.RotateTool);
        csTools.default.addTool(csTools.default.StackScrollTool);

        // 设置默认工具
        csTools.default.setToolActive('Pan', { mouseButtonMask: 1 });
        csTools.default.setToolActive('Zoom', { mouseButtonMask: 2 });

        // 添加事件监听器
        element.addEventListener('cornerstoneimagerendered', (evt: Event) => {
          try {
            const eventData = (evt as any).detail;
            const viewport = eventData.viewport;
            setViewport({
              scale: viewport.scale,
              translation: { x: viewport.translation.x, y: viewport.translation.y },
              voi: { windowWidth: viewport.voi.windowWidth, windowCenter: viewport.voi.windowCenter },
              rotation: viewport.rotation,
            });
          } catch (error) {
            console.error('处理视口事件时出错:', error);
          }
        });

        // 启用触摸事件
        element.addEventListener('touchstart', (e) => {
          e.preventDefault();
        });
      } catch (error) {
        console.error('Failed to initialize Cornerstone:', error);
        message.error('初始化影像查看器失败');
      }
    };

    initCornerstone();

    return () => {
      if (typeof window !== 'undefined' && viewerRef.current) {
        import('cornerstone-core').then((cs) => {
          cs.default.disable(viewerRef.current!);
        });
      }
    };
  }, []);

  // 重置视图
  const handleReset = async () => {
    if (!viewerRef.current) return;
    
    try {
      const cs = await import('cornerstone-core');
      const element = viewerRef.current;
      
      // 重置视口参数
      const viewport = (cs.default as any).getDefaultViewport(element);
      (cs.default as any).setViewport(element, viewport);
      (cs.default as any).updateImage(element);
      
      // 重置状态
      setViewport({
        scale: 1,
        translation: { x: 0, y: 0 },
        voi: { windowWidth: 400, windowCenter: 40 },
        rotation: 0,
      });
      
      message.success('视图已重置');
    } catch (error) {
      console.error('Reset error:', error);
      message.error('重置视图失败');
    }
  };

  // 截图功能
  const handleScreenshot = async () => {
    if (!viewerRef.current) return;
    
    try {
      const cs = await import('cornerstone-core');
      const element = viewerRef.current;
      const enabledElement = cs.default.getEnabledElement(element);
      if (!enabledElement || !enabledElement.canvas) {
        message.error('未找到可用的图像');
        return;
      }

      // 获取当前显示的 canvas
      const canvas = enabledElement.canvas;

      // 创建临时 canvas 来包含所有标注
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
      
      if (!ctx) {
        message.error('创建截图失败');
        return;
      }

      // 绘制原始图像和标注
      ctx.drawImage(canvas, 0, 0);

      // 转换为图片并下载
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const link = document.createElement('a');
      link.download = `dicom-image-${timestamp}.png`;
      link.href = tempCanvas.toDataURL('image/png');
      link.click();
      
      message.success('截图已保存');
    } catch (error) {
      console.error('Screenshot error:', error);
      message.error('截图失败');
    }
  };

  // 加载 DICOM 序列
  const loadDicomSeries = async (seriesPath: string) => {
    try {
      // 获取目录下的所有 DICOM 文件
      const response = await fetch(`/api/dicom-files?path=${seriesPath}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '加载 DICOM 文件失败');
      }

      if (!Array.isArray(data)) {
        console.error('Invalid response data:', data);
        throw new Error('服务器返回数据格式错误');
      }

      if (data.length === 0) {
        message.warning('未找到 DICOM 文件');
        return;
      }

      // 创建 imageIds
      const newImageIds = data.map(file => `wadouri:${seriesPath}/${file}`);
      setImageIds(newImageIds);
      setCurrentImageIndex(0);

      // 加载第一张图像
      if (!viewerRef.current) {
        throw new Error('影像查看器未初始化');
      }

      const cs = await import('cornerstone-core');
      const image = await cs.default.loadAndCacheImage(newImageIds[0]);
      cs.default.displayImage(viewerRef.current, image);
      
      message.success(`成功加载 ${newImageIds.length} 张影像`);
    } catch (error) {
      console.error('Failed to load DICOM series:', error);
      message.error(error instanceof Error ? error.message : '加载影像数据失败');
    }
  };

  // 处理工具切换
  const handleToolChange = async (tool: string) => {
    if (typeof window === 'undefined' || !viewerRef.current) return;
    
    try {
      const csTools = await import('cornerstone-tools');
      
      // 停用所有工具
      ['Pan', 'Zoom', 'Wwwc', 'RectangleRoi', 'Length', 'Rotate'].forEach(toolName => {
        try {
          csTools.default.setToolPassive(toolName);
        } catch (error) {
          console.warn(`Failed to deactivate tool ${toolName}:`, error);
        }
      });
      
      // 启用选中的工具
      csTools.default.setToolActive(tool, { mouseButtonMask: 1 });
      // 保持滚动工具激活
      csTools.default.setToolActive('StackScroll', { mouseButtonMask: 2 });
      setSelectedTool(tool);
      
      // 显示工具提示
      const toolTips: { [key: string]: string } = {
        Pan: '使用鼠标左键拖动图像',
        Zoom: '使用鼠标左键上下拖动进行缩放',
        Wwwc: '使用鼠标左键调整窗宽窗位',
        RectangleRoi: '使用鼠标左键绘制矩形区域',
        Length: '使用鼠标左键测量距离',
        Rotate: '使用鼠标左键旋转图像'
      };
      
      message.info(toolTips[tool] || '工具已切换');
    } catch (error) {
      console.error(`Failed to change tool to ${tool}:`, error);
      message.error(`无法切换到${tool}工具`);
    }
  };

  // 处理序列选择
  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeries(seriesId);
    const series = dicomStudies.studies
      .flatMap(study => study.series)
      .find(s => s.id === seriesId);
    
    if (series) {
      loadDicomSeries(series.path);
    }
  };

  // 处理图像切换
  const handleImageScroll = async (delta: number) => {
    if (imageIds.length === 0) return;

    const newIndex = Math.max(0, Math.min(currentImageIndex + delta, imageIds.length - 1));
    if (newIndex !== currentImageIndex && viewerRef.current) {
      setCurrentImageIndex(newIndex);
      const cs = await import('cornerstone-core');
      const image = await cs.default.loadAndCacheImage(imageIds[newIndex]);
      cs.default.displayImage(viewerRef.current, image);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* 左侧检查列表 */}
        <Col span={6}>
          <Card title="检查列表">
            <List
              dataSource={dicomStudies.studies}
              renderItem={(study, index) => (
                <List.Item>
                  <Card size="small" style={{ width: '100%' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        width: '100%' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Text strong style={{ color: '#1890ff', minWidth: '24px' }}>#{index + 1}</Text>
                          <Tag color="blue">{study.type}</Tag>
                          <Text strong>{study.description}</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {study.date}
                        </Text>
                      </div>
                      <List
                        size="small"
                        dataSource={study.series}
                        renderItem={series => (
                          <List.Item
                            onClick={() => handleSeriesSelect(series.id)}
                            style={{ 
                              cursor: 'pointer',
                              backgroundColor: selectedSeries === series.id ? '#e6f7ff' : 'transparent',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              marginLeft: '32px',
                              borderLeft: '2px solid #e8e8e8'
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              width: '100%'
                            }}>
                              <FileImageOutlined style={{ color: '#1890ff' }} />
                              <div>{series.description}</div>
                              {study.report.hasAbnormal && (
                                <WarningOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                              )}
                              {selectedSeries === series.id && (
                                <Tag color="blue" style={{ marginLeft: 'auto' }}>当前</Tag>
                              )}
                            </div>
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 右侧影像查看器和报告 */}
        <Col span={18}>
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            {/* 检查报告 */}
            {selectedSeries && (
              <Card
                title={
                  <Space>
                    <FileTextOutlined />
                    <span>检查报告</span>
                    {dicomStudies.studies.find(study => 
                      study.series.some(s => s.id === selectedSeries)
                    )?.report.hasAbnormal && (
                      <Tag color="error">异常</Tag>
                    )}
                  </Space>
                }
              >
                {dicomStudies.studies.map(study => (
                  study.series.some(s => s.id === selectedSeries) && (
                    <Row key={study.id} gutter={16}>
                      <Col span={12}>
                        <div style={{ 
                          backgroundColor: '#fafafa', 
                          padding: '16px', 
                          borderRadius: '8px',
                          height: '100%'
                        }}>
                          <Title level={5}>检查所见</Title>
                          <List
                            size="small"
                            dataSource={study.report.findings}
                            renderItem={(item, index) => (
                              <List.Item style={{ padding: '4px 0' }}>
                                <Text>{index + 1}. {item}</Text>
                              </List.Item>
                            )}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ 
                          backgroundColor: '#fafafa', 
                          padding: '16px', 
                          borderRadius: '8px',
                          height: '100%'
                        }}>
                          <Title level={5}>印象</Title>
                          <List
                            size="small"
                            dataSource={study.report.impression}
                            renderItem={(item, index) => (
                              <List.Item style={{ padding: '4px 0' }}>
                                <Text strong>{index + 1}. {item}</Text>
                              </List.Item>
                            )}
                          />
                        </div>
                      </Col>
                    </Row>
                  )
                ))}
              </Card>
            )}

            {/* 影像查看器 */}
            <Card
              title={
                <Space>
                  <span>影像查看器</span>
                  {imageIds.length > 0 && (
                    <Tag color="blue">
                      {currentImageIndex + 1} / {imageIds.length}
                    </Tag>
                  )}
                </Space>
              }
              extra={
                <Space>
                  <Button
                    icon={<DragOutlined />}
                    type={selectedTool === 'Pan' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('Pan')}
                  >
                    平移
                  </Button>
                  <Button
                    icon={<ZoomInOutlined />}
                    type={selectedTool === 'Zoom' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('Zoom')}
                  >
                    缩放
                  </Button>
                  <Button
                    icon={<ControlOutlined />}
                    type={selectedTool === 'Wwwc' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('Wwwc')}
                  >
                    窗宽窗位
                  </Button>
                  <Button
                    icon={<BorderOutlined />}
                    type={selectedTool === 'RectangleRoi' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('RectangleRoi')}
                  >
                    矩形标注
                  </Button>
                  <Button
                    icon={<LineOutlined />}
                    type={selectedTool === 'Length' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('Length')}
                  >
                    测量
                  </Button>
                  <Button
                    icon={<RetweetOutlined />}
                    type={selectedTool === 'Rotate' ? 'primary' : 'default'}
                    onClick={() => handleToolChange('Rotate')}
                  >
                    旋转
                  </Button>
                  <Button
                    icon={<UndoOutlined />}
                    onClick={handleReset}
                  >
                    重置
                  </Button>
                  <Button
                    icon={<CameraOutlined />}
                    onClick={handleScreenshot}
                  >
                    截图
                  </Button>
                </Space>
              }
            >
              <div
                ref={viewerRef}
                style={{
                  width: '100%',
                  height: 'calc(100vh - 500px)',
                  backgroundColor: '#000',
                  position: 'relative'
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  handleImageScroll(e.deltaY > 0 ? 1 : -1);
                }}
              />
              {/* 显示当前视口信息 */}
              {imageIds.length > 0 && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: 24, 
                  left: 24, 
                  color: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 12
                }}>
                  缩放: {viewport.scale.toFixed(2)}x | 
                  窗宽: {viewport.voi.windowWidth.toFixed(0)} | 
                  窗位: {viewport.voi.windowCenter.toFixed(0)} | 
                  旋转: {viewport.rotation}°
                </div>
              )}
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ImagingTab; 