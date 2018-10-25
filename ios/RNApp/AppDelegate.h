/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <RCTGetuiModule/RCTGetuiModule.h>
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
#import <UserNotifications/UserNotifications.h>
#endif
#define kGtAppId @"FdcAQSDYcF9P0BERwINh74"
#define kGtAppKey @"B6XmJYZ9kvAKDGqgf0Ykz3"
#define kGtAppSecret @"MfnoEzzkvL7ejae5YwPRpA"


@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate,GeTuiSdkDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
