import { _decorator, resources, TextAsset } from "cc";

const { ccclass } = _decorator;

@ccclass
export default class TrieFilter {
    private static _instance: TrieFilter;
    private sensitiveWords: Set<string> = new Set();

    private constructor() {}

    public static getInstance(): TrieFilter {
        if (!TrieFilter._instance) {
            TrieFilter._instance = new TrieFilter();
        }
        return TrieFilter._instance;
    }

    /**
     * 初始化敏感词库
     */
    public async init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resources.load('SensitiveWords', (err: Error, asset: TextAsset) => {
                if (err) {
                    console.error('加载文件失败:', err);
                    reject(err);
                    return;
                }
                const words = asset.text.split('\n')
                    .map(word => word.trim())
                    .filter(word => word.length > 0);
                words.forEach(word => this.sensitiveWords.add(word));
                console.log(`屏蔽词库加载完成，共${this.sensitiveWords.size}个词`);
                resolve();
            });
        });
    }

    /**
     * 检查是否包含敏感词
     * @param text 待检查文本
     * @returns 是否包含敏感词
     */
    public containsSensitiveWords(text: string): boolean {
        for (const word of this.sensitiveWords) {
            if (text.includes(word)) {
                return true;
            }
        }
        return false;
    }
}