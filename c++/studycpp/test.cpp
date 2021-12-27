#include <iostream>
#include <cmath>
using namespace std;
// nml表示3个数组的长度
int func(int *n1,int *n2,int *n3,int n,int m,int l){
	int i =0, j=0, k=0, ans=2100000000; // 三个指针， ans 初始化极大值
	while (i < n && j < m && k<l)  // 当任意一个数组没有遍历完成时，
	{
		int t = abs(n1[i]-n2[j]) + abs(n2[j] - n3[k]) + abs(n1[i] - n3[k]); // 求三元组的距离，尝试去更新答案
		ans = min(ans, t); // 找到最小的位置，让指针向后移动
		if (n1[i] < n2[j] && n1[i] < n3[k])
		{
			i++;
		}
		else if (n2[j] < n1[i] && n2[j] < n3[k])
		{
			j++;
		}
		else {k++;}
	}
	//  求解完成时返回答案
	return ans;
	
			
	
}

int main(){
	int n1[105],n2[105],n3[105],n,m,l;
	cin >> n >> m >> l ;
	for (int i = 0; i < n; i++)
	{
		cin >> n1[i];
	}
	for (int i = 0; i < m; i++)
	{
		cin >> n2[i];
	}
	for (int i = 0; i < l; i++)
	{
		cin >> n3[i];
	}
	cout << func(n1, n2, n3, n, m, l) <<endl;
	return 0;
}

/**
 * 数组的最长长度是N
 * 那么时间复杂度 O(N)
 * 空间复杂度，只关注完成功能的空间，
 * 只定义了 i/j/k 常数级别，  空间复杂度O(1)
 **/