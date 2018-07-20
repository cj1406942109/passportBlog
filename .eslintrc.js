module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        // "no-use-before-define": "error",
        "no-console": "off",
        "eqeqeq": ["error", "always"],
        // 强制数组方括号中使用一致的空格
        "array-bracket-spacing": ["error", "never"],
        // 禁止或强制在代码块中开括号前和闭括号后有空格
        "block-spacing": ["error", "always"],
        // 强制在代码块中使用一致的大括号风格
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        // 强制使用骆驼拼写法命名约定
        // "camelcase": "error",
        // 强制使用一致的逗号风格
        "comma-style": ["error", "last"],
        // 强制在计算的属性的方括号中使用一致的空格
        "computed-property-spacing": ["error", "never"],
        // 要求或禁止文件末尾存在空行
        "eol-last": ["error", "always"],
        // 要求或禁止在函数标识符和其调用之间有空格
        "func-call-spacing": ["error", "never"],
        // 要求或禁止使用命名的 function 表达式
        // "func-names": ["error", "always"],
        // 强制一致地使用 function 声明或表达式
        "func-style": ["error", "declaration"],
        // 强制在函数括号内使用一致的换行
        // "function-paren-newline": ["error", { "minItems": 3 }],
        // 强制使用一致的缩进
        "indent": ["error", 2],
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
        // 强制行注释的位置
        "line-comment-position": ["error", { "position": "above" }],
        // 强制使用一致的换行风格
        // "linebreak-style": ["error", "windows"],
        // 要求在注释周围有空行
        // "lines-around-comment": ["error", { "beforeBlockComment": true }],
        // 强制对多行注释使用特定风格
        // "multiline-comment-style": ["error", "starred-block"],
        // 要求调用无参构造函数时有圆括号
        "new-parens": "error",
        // 禁止在代码后使用内联注释
        "no-inline-comments": "error",
        // 禁止出现多行空行
        "no-multiple-empty-lines": "error",
        // 禁用行尾空格
        "no-trailing-spaces": "error",
        // 禁止属性前有空白
        "no-whitespace-before-property": "error",
        // 强制大括号内换行符的一致性
        // "object-curly-newline": ["error", { "multiline": true }],
        // 强制在大括号中使用一致的空格
        "object-curly-spacing": ["error", "always"],
        // 要求或禁止块内填充
        "padded-blocks": ["error", "never"],
        // 要求对象字面量属性名称用引号括起来
        "quote-props": ["error", "consistent"],
        // 强制使用一致的反勾号、双引号或单引号
        "quotes": ["error", "single"],
        // 要求或禁止使用分号代替 ASI
        "semi": ["error", "never"],
        // 要求操作符周围有空格
        "space-infix-ops": "error",
        // 强制在注释中 // 或 /* 使用一致的空格
        "spaced-comment": ["error", "always"]
    }
}
