import React, { useState } from 'react';
import { Radio, Slider } from 'antd';
import { EllipsisText } from 'dt-react-component';

const LONG_TEXT =
    '这是一段很长的文本，用来对比默认省略与动态测量的差异，你可以尝试拖动滑块和切换模式来观察变化';

export default () => {
    const [mode, setMode] = useState<'default' | 'dynamic'>('default');
    const [maxWidth, setMaxWidth] = useState(180);
    const dynamic = mode === 'dynamic';

    return (
        <div style={{ width: 300 }}>
            <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
                <Radio value="default">默认（Typography 轻量省略）</Radio>
                <Radio value="dynamic">dynamic（动态测量）</Radio>
            </Radio.Group>
            <div style={{ marginTop: 8 }}>
                <div>maxWidth：{maxWidth}px（仅 dynamic 时生效，默认模式下置灰）</div>
                <Slider
                    min={80}
                    max={280}
                    value={maxWidth}
                    onChange={setMaxWidth}
                    disabled={!dynamic}
                />
            </div>
            <div style={{ marginTop: 8 }}>
                {dynamic ? (
                    <EllipsisText dynamic value={LONG_TEXT} maxWidth={maxWidth} />
                ) : (
                    <EllipsisText value={LONG_TEXT} />
                )}
            </div>
        </div>
    );
};
