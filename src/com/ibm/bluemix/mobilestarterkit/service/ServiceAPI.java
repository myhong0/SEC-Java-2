/*
 * Copyright 2015 IBM Corp. All Rights Reserved
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ibm.bluemix.mobilestarterkit.service;

import java.util.Vector;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/service")
public class ServiceAPI {

	static Vector v = new Vector<>();
	
	
	@Path("/login")
	@POST
	public String checkLogin(String creds) {
		try {
			JSONObject credentials = new JSONObject(creds);
			String userID = credentials.getString("user_id");
			String password = credentials.getString("password");
			if (userID.equals("admin") && password.equals("password")) {
				return "Successful";
			} else {
				return "Failed";
			}

			
		} catch (JSONException e) {

			e.getStackTrace();
			return "Failed";

		}
	}
	
	@Path("/autoscaling")
	@POST
	public String autoScalingByMem(String param) {
		try {
			JSONObject meta = new JSONObject(param);
			
			
			Runtime rt = Runtime.getRuntime();
			int mem_usage = (int)((rt.totalMemory()*100.0)/(rt.maxMemory()*1.0));
			
				String action = meta.getString("action");
	
			if ("mem_up".equalsIgnoreCase(action)) {
				// 10M 씩 늘려간다. Out of memory 발생할 수 있음.
				for (int i = 0 ; i < 10; i++) {
					byte b[] = new byte[1048576];
					v.add(b);
				}
			} else if ("mem_safe_up".equalsIgnoreCase(action) && mem_usage < 90) {
				// 메모리 사용량 90% 이하 일때, 10M 추가. OOM 방지
				for (int i = 0 ; i < 10; i++) {
					byte b[] = new byte[1048576];
					v.add(b);
				}					
			} else if ("mem_reset".equalsIgnoreCase(action)) {
				// 메모리 점유 해제
				v = new Vector();
				rt.gc();
			}			
			String msg = "Max " + (rt.maxMemory()/1000) + " KB  Total used : " + (rt.totalMemory()/1000) + " KB  Free : " + (rt.freeMemory() / 1000) + " KB  " + (int)((rt.totalMemory()*100.0)/(rt.maxMemory()*1.0)) + " %";
		    System.out.println( msg);
			return msg;
			
		} catch (JSONException e) {

			e.getStackTrace();
			return "Failed";

		}
	}

	@Path("/searchtips")
	@POST
	public String searchTips(String keyword){

		String QandAList = null;

		try {

			JSONObject keywordObj = new JSONObject(keyword);
			String question = keywordObj.getString("question");
			
			JSONObject responseJSON = new JSONObject();
			
			if( question.equals( "depression" ) ) {
			
				JSONObject questionandasnwer = new JSONObject();
				questionandasnwer.put("question", "What is " + question + "?");
				
				JSONArray answerArray = new JSONArray();
			
				JSONObject answers = new JSONObject();
				answers.put( "text", "you can not sleep or you sleep too much");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you can not concentrate or find that previously easy tasks are now difficult");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you feel hopeless and helpless");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you can not control your negative thoughts, no matter how much you try");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text",  "you have lost your appetite or you can not stop eating");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you are much more irritable, short-tempered, or aggressive than usual");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you are consuming more alcohol than normal or engaging in other reckless behavior");
				answerArray.put( answers );
				
				answers = new JSONObject();
				answers.put( "text", "you have thoughts that life is not worth living (seek help immediately if this is the case");
				answerArray.put( answers );
				
				questionandasnwer.put("answers", answerArray);
				
				JSONArray qanda = new JSONArray();
				qanda.put( questionandasnwer );
				
				responseJSON.put("qa", qanda);
				return responseJSON.toString();
				//System.out.println(responseJSON.toString());
			} else {
				return "Failed";
			}
		}
		catch (JSONException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return "Failed";
		}
	}

	
}
