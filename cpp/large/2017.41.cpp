#include <iostream>
using namespace std;
// p当前节点指针，  deep p点在第几层
void func (node *p, int deep){
    
    //  叶子节点不输出
    if (p->left === nullptr&& p->right === nullptr)
    {
        cout << p->val;
        return;
    }

    if(depp != 1){
        cout << "(";
    }

    // 中序遍历  
    if (p->left != nullptr)
    {
        func(p->left, deep + 1)
    }
    cout << p->val;
    if (p->right != nullptr)
    {
        func(p->right, deep + 1)
    }

    if(depp != 1){
        cout << ")";
    }

} // namespace std


