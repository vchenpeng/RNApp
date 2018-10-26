//
//  GetuiBridge.m
//  RNApp
//
//  Created by 陈鹏 on 2018/10/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "MainBridge.h"

@implementation GetuiBridge
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
@end
