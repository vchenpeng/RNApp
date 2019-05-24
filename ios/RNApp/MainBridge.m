//
//  MainBridge.m
//  RNApp
//
//  Created by 陈鹏 on 2018/10/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioToolbox.h>
#import "MainBridge.h"

@implementation MainBridge
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(sendText, num:(nonnull NSNumber *)num str:(NSString *)str arr:(NSArray *)arr)
{
  NSLog(@"%@ %@ %@", num, str, arr);
}
RCT_REMAP_METHOD(setBadge, num:(NSInteger)num)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:num];
  });
}
// 计算缓存
 RCT_EXPORT_METHOD(getCacheSize:(RCTResponseSenderBlock)callback)
 {
   NSURLCache *httpCache = [NSURLCache sharedURLCache];
   NSUInteger cache = [httpCache currentDiskUsage];
   callback(@[[NSNull null],@(cache)]);
 }
 //  清理缓存
RCT_EXPORT_METHOD(cleanCache:(RCTResponseSenderBlock)callback)
{
  NSURLCache *httpCache = [NSURLCache sharedURLCache];
  [httpCache removeAllCachedResponses];
  NSUInteger cache = [httpCache currentDiskUsage];
  callback(@[[NSNull null],@(cache)]);
}
//  播放系统声音
RCT_EXPORT_METHOD(playSystemAudio:(NSInteger)id)
{
  SystemSoundID soundID = (SystemSoundID)id;
  AudioServicesPlaySystemSound(soundID);
}
//  屏幕常亮
RCT_EXPORT_METHOD(setIdleTimerDisabled:(BOOL)flag)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] setIdleTimerDisabled:flag];
  });
}
//  屏幕亮度
RCT_EXPORT_METHOD(setBrightness:(CGFloat)value)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIScreen mainScreen] setBrightness:value];
  });
}
//  获取safearea位置
RCT_EXPORT_METHOD(getSafeAreaInsets:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootCtrl = UIApplication.sharedApplication.delegate.window.rootViewController;
    if (@available(iOS 11.0, *)) {
      UIEdgeInsets insets = rootCtrl.view.safeAreaInsets;
      NSDictionary *dict = @{@"top":[NSNumber numberWithInt:insets.top],
                             @"bottom":[NSNumber numberWithInt:insets.bottom],
                             @"left":[NSNumber numberWithInt:insets.left],
                             @"right":[NSNumber numberWithInt:insets.right]};
      callback(@[[NSNull null], dict]);
    } else {
      NSDictionary *dict = @{@"top":@0,@"bottom":@0,@"left":@0,@"right":@0};
      callback(@[[NSNull null], dict]);
    }
  });
}
@end
