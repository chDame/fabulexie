/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.fabulexie.core.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.google.common.collect.Sets;

/**
 * @author christophe.dame
 */
public class SyllabeUtils {
	
	private static final Map<String, Integer> cache = new HashMap<>();
	
	private static final String voyelles ="aeiyouàäâéêèëíîïôöùûüœAEIOUÀÄÂÉÊÈËÍÎÏÔÖÙÛÜŒ";
	private static final String notApplicable =" .?,;:!’»«\\'–-0123456789";
	private static final Set<String> uncuttable = Sets.newHashSet("ch", "ph", "sc", "gn", "th");
	
	
	private SyllabeUtils() {
		
	}
	private static boolean  isUnapplicable(char letter) {
		return notApplicable.indexOf(letter)>=0;
	}
	private static boolean isVoyelle(char letter) {
		return voyelles.indexOf(letter)>=0;
	}

	public static int cachedCeisure(String search) {
		if (cache.containsKey(search)) {
			return cache.get(search);
		}
		int result = ceisure(search);
		cache.put(search, result);
		return result;
	}
	
	public static int ceisure(String search) {
		
		char letter = search.charAt(0);
		char letterPlus1 = search.charAt(1);
		char letterPlus2 = search.charAt(2);
		char letterPlus3 = search.charAt(3);
		if (isUnapplicable(letter) ||isUnapplicable(letterPlus1) || isUnapplicable(letterPlus2)) {
			return -1;
		}

		String concat01 = search.substring(0,2);
		String concat12 = search.substring(1,3);
		
		//VCC
		if (isVoyelle(letter) && !isVoyelle(letterPlus1) && !isVoyelle(letterPlus2)) {
			//ren[ard,]
			if (isUnapplicable(letterPlus3)) {
				return -1;
			}
			//macher ma-cher
			if (uncuttable.contains(concat12)) {
				return 1;
			}
			//Maître => Maî-tre
			if (letterPlus2!=letterPlus1 && (letterPlus2=='l' || letterPlus2=='r')) {
				return 1;
			}
			
			//courber cour-ber
			return 2;
		}
		//VCV
		if (isVoyelle(letter) && !isVoyelle(letterPlus1) && isVoyelle(letterPlus2)) {
			//tracas => tra-cas
			return 1;
		}
		//CCC
		if (!isVoyelle(letter) && !isVoyelle(letterPlus1) && !isVoyelle(letterPlus2)) {
			//pro[mpt,]
			if (isUnapplicable(letterPlus3)) {
				return -1;
			}
			//complet => com-pler surprise sur-pri-se
			if (letterPlus2=='l' || letterPlus2=='r' || uncuttable.contains(concat12)) {
				return 1;
			}
			//christophe => chris-to-phe
			if (uncuttable.contains(concat01)) {
				return -1;
			}

			//compte com -pte
			return 2;
		}
		return -1;
	}
	
}
