import React, { useEffect } from 'react';
import { Select } from 'antd';
import { EllipsisText } from 'dt-react-component';

export default () => {
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const sleep = (time: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    };

    const getOptions = async () => {
        await sleep(2000);
        const opt = [
            {
                label: '任务名称',
                value: 'task-name-1',
            },
            {
                label: '这是一个较长的任务名称',
                value: 'task-name-2',
            },
            {
                label: '这是一段特别长的任务名称',
                value: 'task-name-3',
            },
            {
                label: '这是一段特别长的任务名称，用于验证在文本过长时展示省略号',
                value: 'task-name-4',
            },
            {
                label: '这是一段特别长的任务名称，用于验证在文本过长时优雅地展示省略号，并通过悬停查看完整内容',
                value: 'task-name-5',
            },
        ];
        setOptions(opt);
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div style={{ width: 200 }}>
            <Select style={{ width: '100%' }}>
                {options.map((opt) => {
                    return (
                        <Select.Option value={opt.value} key={opt.value}>
                            <span>
                                <EllipsisText dynamic value={opt.label} maxWidth={'100%'} />
                            </span>
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};
