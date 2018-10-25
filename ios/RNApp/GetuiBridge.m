//
//  GetuiBridge.m
//  RNApp
//
//  Created by 陈鹏 on 2018/10/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "GetuiBridge.h"

@implementation GetuiBridge
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(sendText, num:(nonnull NSNumber *)num str:(NSString *)str arr:(NSArray *)arr)
{
  NSLog(@"%@ %@ %@", num, str, arr);
}
RCT_REMAP_METHOD(setBadge, num:(NSInteger)num)
{
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:num];
}
@end
