使用React Native 构建的 图书借阅App，支持IOS 和 Android，包含图书展示、借阅图书、查看借阅历史、图书评论、还书等功能。。。

代码下载到本地后，调试IOS平台时，在AppDelegate.m文件中将下面的第一行代码取消注释，注释掉第二行代码

	//jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
	jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];

仅限公司内部使用
