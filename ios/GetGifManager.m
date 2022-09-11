//
//  GetGifManager.m
//  CatpediaReact
//
//  Created by Celia Herrera Ferreira on 11/9/22.
//

#import "GetGifManager.h"
#import <React/RCTConvert.h>

@implementation SPGetGifManager

RCT_EXPORT_MODULE(GetGifManager)

RCT_EXPORT_METHOD(configureUrl:(NSString *)type callback:(RCTResponseSenderBlock)callback) {
  NSString *urlToInvoke = @"https://api.thecatapi.com/v1/images/search?limit=1&size=full&mime_types=";
  urlToInvoke = [urlToInvoke stringByAppendingString:type];
  @try{
    callback(@[[NSNull null], urlToInvoke]);
  }
  @catch(NSException *exception){
    callback(@[exception.reason, [NSNull null]]);
  }
}

@end
