using System;
using System.Collections.Generic;

/// <summary>
/// 泛型多类型对象池管理器
/// 每个类型有独立的类型安全池
/// </summary>
public class GenericMultiTypePool
{
    // ========== 核心接口 ==========
    
    /// <summary>
    /// 泛型池接口
    /// </summary>
    private interface ITypedPool
    {
        // 非泛型方法，用于统一管理
        void Prewarm(int count);
        void Clear();
        int CountInPool { get; }
        int CountActive { get; }
    }
    
    /// <summary>
    /// 泛型池实现
    /// </summary>
    private class TypedPool<T> : ObjectPool<T>, ITypedPool where T : class
    {
        public TypedPool(
            Func<T> createFunc,
            Action<T> onGet = null,
            Action<T> onReturn = null,
            int initialSize = 0,
            int maxSize = 0)
            : base(createFunc, onGet, onReturn, initialSize, maxSize)
        {
        }
    }
    
    // ========== 核心数据结构 ==========
    
    /// <summary>
    /// 类型到泛型池的映射
    /// 使用Dictionary<Type, object>存储不同类型池
    /// </summary>
    private readonly Dictionary<Type, ITypedPool> _typedPools = 
        new Dictionary<Type, ITypedPool>();
    
    // ========== 池管理方法 ==========
    
    /// <summary>
    /// 为指定类型创建对象池
    /// </summary>
    public void CreatePool<T>(
        Func<T> createFunc,
        Action<T> onGet = null,
        Action<T> onReturn = null,
        int initialSize = 0,
        int maxSize = 0) where T : class
    {
        Type type = typeof(T);
        
        if (_typedPools.ContainsKey(type))
        {
            Debug.LogWarning($"类型 {type.Name} 的对象池已存在，将替换");
            _typedPools.Remove(type);
        }
        
        var pool = new TypedPool<T>(
            createFunc, onGet, onReturn, initialSize, maxSize);
        
        _typedPools.Add(type, pool);
    }
    
    /// <summary>
    /// 从指定类型的池中获取对象
    /// </summary>
    public T Get<T>() where T : class
    {
        Type type = typeof(T);
        
        if (!_typedPools.TryGetValue(type, out var poolObj))
        {
            Debug.LogError($"类型 {type.Name} 的对象池不存在");
            return null;
        }
        
        TypedPool<T> pool = poolObj as TypedPool<T>;
        if (pool == null)
        {
            Debug.LogError($"类型转换失败: {type.Name}");
            return null;
        }
        
        return pool.Get();
    }
    
    /// <summary>
    /// 归还对象到对应类型的池
    /// </summary>
    public void Return<T>(T item) where T : class
    {
        if (item == null)
        {
            Debug.LogWarning("尝试归还null对象");
            return;
        }
        
        Type type = typeof(T);
        
        if (!_typedPools.TryGetValue(type, out var poolObj))
        {
            Debug.LogError($"类型 {type.Name} 的对象池不存在");
            return;
        }
        
        TypedPool<T> pool = poolObj as TypedPool<T>;
        if (pool == null)
        {
            Debug.LogError($"类型转换失败: {type.Name}");
            return;
        }
        
        pool.Return(item);
    }
    
    /// <summary>
    /// 动态归还对象（自动检测类型）
    /// 性能比泛型版本稍差，但更灵活
    /// </summary>
    public void Return(object item)
    {
        if (item == null)
        {
            Debug.LogWarning("尝试归还null对象");
            return;
        }
        
        Type type = item.GetType();
        
        // 查找最匹配的池
        foreach (var kvp in _typedPools)
        {
            // 检查类型是否匹配或可转换
            if (kvp.Key.IsAssignableFrom(type))
            {
                // 使用反射调用Return方法
                var method = GetType().GetMethod("Return")
                    .MakeGenericMethod(kvp.Key);
                method.Invoke(this, new[] { item });
                return;
            }
        }
        
        Debug.LogError($"找不到匹配的对象池: {type.Name}");
    }
    
    // ========== 统计方法 ==========
    
    /// <summary>
    /// 获取指定类型池的统计信息
    /// </summary>
    public PoolStats GetPoolStats<T>() where T : class
    {
        Type type = typeof(T);
        
        if (_typedPools.TryGetValue(type, out var poolObj))
        {
            return new PoolStats
            {
                TypeName = type.Name,
                CountInPool = poolObj.CountInPool,
                CountActive = poolObj.CountActive
            };
        }
        
        return null;
    }
    
    public struct PoolStats
    {
        public string TypeName;
        public int CountInPool;
        public int CountActive;
    }
}

// ========== 使用示例 ==========

public class MultiTypePoolExample : MonoBehaviour
{
    private GenericMultiTypePool _multiPool;
    
    void Start()
    {
        _multiPool = new GenericMultiTypePool();
        
        // 创建不同类型的池
        // 1. GameObject池
        _multiPool.CreatePool<GameObject>(
            createFunc: () => new GameObject("PooledObject"),
            onGet: (obj) => obj.SetActive(true),
            onReturn: (obj) => obj.SetActive(false),
            initialSize: 5,
            maxSize: 20
        );
        
        // 2. 子弹池
        _multiPool.CreatePool<Bullet>(
            createFunc: () => new Bullet(),
            onGet: (bullet) => bullet.Reset(),
            onReturn: (bullet) => bullet.Disable(),
            initialSize: 10,
            maxSize: 50
        );
        
        // 3. 特效池
        _multiPool.CreatePool<ParticleSystem>(
            createFunc: () => Instantiate(effectPrefab).GetComponent<ParticleSystem>(),
            onGet: (effect) => effect.Play(),
            onReturn: (effect) => effect.Stop(),
            initialSize: 3,
            maxSize: 10
        );
    }
    
    void Update()
    {
        // 获取不同对象
        if (Input.GetKeyDown(KeyCode.Alpha1))
        {
            GameObject obj = _multiPool.Get<GameObject>();
            // 使用obj...
        }
        
        if (Input.GetKeyDown(KeyCode.Alpha2))
        {
            Bullet bullet = _multiPool.Get<Bullet>();
            // 使用bullet...
        }
    }
    
    void OnDestroy()
    {
        // 清理所有池
        // 需要扩展GenericMultiTypePool支持ClearAll方法
    }
}